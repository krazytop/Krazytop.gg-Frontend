import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BungieAuthService} from "./bungie-authentification/bungie-auth.service";
import {map, Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {DestinyProfileModel} from "../../model/destiny/destiny-profile.model";
import {DestinyCharacterInventoryModel} from "../../model/destiny/destiny-character-inventory.model";
import {DestinyItemInstanceModel} from "../../model/destiny/destiny-item-instance.model";
import {DestinyItemModel} from "../../model/destiny/destiny-item.model";
import {DestinyLinkedProfilesModel} from "../../model/destiny/destiny-linked-profiles.model";
import {DestinyItemNomenclature} from "../../model/destiny/nomenclature/destiny-item.nomenclature";
import {HeaderService} from "../../config/headers.service";
import {
  DestinyPresentationTreeEnum,
  getAllPresentationTrees
} from "../../model/destiny/enum/DestinyPresentationTreeEnum"
import {DestinyPresentationTreeNomenclature} from "../../model/destiny/destiny-presentation-tree.model";
import {DestinyNodeProgressionModel} from "../../model/destiny/destiny-node-progression.model";
import {DestinyDataStorage} from "./DestinyDataStorage";
import {DestinyRecordNomenclature} from "../../model/destiny/nomenclature/destiny-record.nomenclature";
import {Engrams, MainCurrencies} from "../../model/destiny/enum/DestinyMainInventoryEnum";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'destiny',
  templateUrl: './destiny.component.html',
  styleUrls: ['./destiny.component.css']
})
export class DestinyComponent implements OnInit, OnDestroy {

  componentToShow: string | undefined;
  componentToShowArg1: string | undefined;
  isThisComponentReady: boolean = false;

  public static destinyAssetUrl: string = "https://www.bungie.net";

  constructor(private http: HttpClient, private route: ActivatedRoute, private bungieAuthService: BungieAuthService, private router: Router, protected dataStorage: DestinyDataStorage) {}

  ngOnInit() {
    let platform: number | undefined;
    let membership: string | undefined;
    this.route.params.subscribe(params => {
      platform = params['platform'];
      membership = params['membership'];
      this.componentToShow = params['component'];
      this.componentToShowArg1 = params['arg1'];
    });
    if (this.dataStorage.isFirstDisplay) {
      this.dataStorage.requestDataRefreshing.subscribe(requestDataRefreshing => {
        if (requestDataRefreshing) {
          this.retrieveAllDestinyData(platform, membership);
        }
      });
      this.refreshData();
      this.dataStorage.isFirstDisplay = false;
    } else {
      this.manageComponentArgs();
      this.isThisComponentReady = true;
    }
  }

  private retrieveAllDestinyData(platform: number | undefined, membership: string | undefined) {
    this.dataStorage.requestDataRefreshing.next(false);
    this.bungieAuthService.checkTokenValidity().subscribe(isTokenValid => {
      if (isTokenValid) {
        this.getProfile(platform!, membership!).subscribe(() => {
          if (this.dataStorage.profile != null) {
            if (this.dataStorage.profile.characters.length === 0) {
              console.log("Need at least one character"); //TODO alert + deconnection
              this.router.navigate(['/']);
            } else {
              this.manageAllRequest(platform!, membership!);
            }
          } else {
            console.log("Failed to load your Destiny profile"); //TODO alert + deconnection
            this.router.navigate(['/']);
          }
        })
      } else {
        //TODO alert + deconnection
      }
    });
  }

  manageAllRequest(platform: number, membership: string) {
    let requestCompleted: number = 4;
    this.getLinkedProfile(platform!, membership!).subscribe(() => {
      requestCompleted --;
      if (requestCompleted === 0) {
        this.manageComponentArgs();
        this.isThisComponentReady = true;
      }
    })
    this.getItemNomenclatures().subscribe(() => {
      requestCompleted --;
      if (requestCompleted === 0) {
        this.manageComponentArgs();
        this.isThisComponentReady = true;
      }
    })
    this.getCharacterTitleNomenclatures().subscribe(() => {
      requestCompleted --;
      if (requestCompleted === 0) {
        this.manageComponentArgs();
        this.isThisComponentReady = true;
      }
    })
    this.getPresentationTreeNomenclatures().subscribe(() => {
      requestCompleted --;
      if (requestCompleted === 0) {
        this.manageComponentArgs();
        this.isThisComponentReady = true;
      }
    })
  }

  manageComponentArgs() {
    if(this.componentToShow === 'titles' && this.componentToShowArg1 !== undefined) this.setSelectedTitle();
  }

  getLinkedProfile(platform: number, membership: string) {
    return this.http.get(`https://www.bungie.net/Platform/Destiny2/${platform}/Profile/${membership}/LinkedProfiles/?getAllMemberships=true`, {headers: this.bungieAuthService.getHeaders()})
      .pipe(
        map((response: any) => {
          let profiles: DestinyLinkedProfilesModel[] = [];
          profiles = profiles.concat(Object.values(response['Response']['profiles']));
          profiles.push(response['Response']['bnetMembership'] as DestinyLinkedProfilesModel)
          Object.values(response['Response']['profilesWithErrors'])
            .forEach((profileWithErrors: any) => profiles.push(profileWithErrors['infoCard'] as DestinyLinkedProfilesModel));
          this.dataStorage.profile.linkedProfiles = profiles;
        })
      );
  }

  getProfile(platform: number, membership: string) {
    return this.http.get(`https://www.bungie.net/Platform/Destiny2/${platform}/Profile/${membership}/?components=102,103,200,201,205,300,700,900`, {headers: this.bungieAuthService.getHeaders()})
      .pipe(
        map((response: any) => {
          const destinyProfile: DestinyProfileModel = new DestinyProfileModel();
          destinyProfile.characters = Object.values(response['Response']['characters']['data']);
          destinyProfile.profileCurrencies = Object.values(response['Response']['profileCurrencies']['data']['items']);
          destinyProfile.profileInventory = Object.values(response['Response']['profileInventory']['data']['items']);
          destinyProfile.characterInventories = Object.entries(response['Response']['characterInventories']['data'])
            .map(([characterHash, items]) => {
              return  {characterHash: characterHash, items: (items as { [items: string]:DestinyItemModel[] })['items']} as DestinyCharacterInventoryModel;
            });
          destinyProfile.characterEquipment = Object.entries(response['Response']['characterEquipment']['data'])
            .map(([characterHash, items]) => {
              return  {characterHash: characterHash, items: (items as { [items: string]:DestinyItemModel[] })['items']} as DestinyCharacterInventoryModel;
            });
          Object.entries(response['Response']['itemComponents']['instances']['data'])
            .forEach(([itemHash, item]) => {
              destinyProfile.itemInstances.set(Number(itemHash), item as DestinyItemInstanceModel);
            });
          Object.entries((response['Response']['characterRecords']['data'][destinyProfile.characters[0].characterId]['records'] as { [nodeHash: string]: DestinyNodeProgressionModel }))
            .forEach(([nodeHash, node]) => {
              destinyProfile.presentationNodeProgress.set(Number(nodeHash), node);
            });
          Object.entries(response['Response']['profileRecords']['data']['records'] as { [nodeHash: string]: DestinyNodeProgressionModel })
            .forEach(([nodeHash, node]) => {
              destinyProfile.presentationNodeProgress.set(Number(nodeHash), node);
            });
          Object.entries((response['Response']['characterPresentationNodes']['data'][destinyProfile.characters[0].characterId]['nodes'] as { [nodeHash: string]: DestinyNodeProgressionModel }))
            .forEach(([nodeHash, node]) => {
              destinyProfile.presentationNodeProgress.set(Number(nodeHash), node);
            });
          Object.entries((response['Response']['profilePresentationNodes']['data']['nodes'] as { [nodeHash: string]: DestinyNodeProgressionModel }))
            .forEach(([nodeHash, node]) => {
              destinyProfile.presentationNodeProgress.set(Number(nodeHash), node);
            });
          this.dataStorage.profile = destinyProfile;
        })
      );
  }

  getItemNomenclatures() {
    let itemHashes: number[] = [];
    this.dataStorage.profile.profileInventory.forEach(item => itemHashes.push(item.itemHash));
    this.dataStorage.profile.profileCurrencies.forEach(item => itemHashes.push(item.itemHash));
    this.dataStorage.profile.characterEquipment.forEach(inventory => inventory.items.forEach(item => itemHashes.push(item.itemHash)));
    this.dataStorage.profile.characterInventories.forEach(inventory => inventory.items.forEach(item => itemHashes.push(item.itemHash)));
    itemHashes.push(...MainCurrencies, ...Engrams)
    return this.http.post<{[itemHash: number]: DestinyItemNomenclature}>(
      environment.apiURL + 'destiny/items', Array.from(new Set(itemHashes)), { headers: HeaderService.getHeaders() }
    ).pipe(
      tap((itemNomenclaturesDictionary:{[itemHash: number]: DestinyItemNomenclature}) => {
        const itemNomenclatures: Map<number, DestinyItemNomenclature> = new Map();
        for (const itemHash in itemNomenclaturesDictionary) {
          itemNomenclatures.set(Number(itemHash), itemNomenclaturesDictionary[itemHash]);
        }
        this.dataStorage.itemNomenclatures = itemNomenclatures;
      })
    )
  }

  getCharacterTitleNomenclatures(): Observable<{[recordHashList: number]: DestinyRecordNomenclature}> {
    const recordHashList: number[] = Array.from(new Set(this.dataStorage.profile.characters.map(character => character.titleRecordHash)));
    return this.http.post<{[recordHashList: number]: DestinyRecordNomenclature}>(
      environment.apiURL + 'destiny/records', recordHashList, { headers: HeaderService.getHeaders() }
    ).pipe(
      tap(recordNomenclatureMap => {
        this.dataStorage.characterTitleNomenclatures = new Map(Object.entries(recordNomenclatureMap));
      })
    );
  }

  getPresentationTreeNomenclatures() {
    let presentationTreeHashes: number[] = getAllPresentationTrees();
    return this.http.post<{[itemHash: number]: DestinyPresentationTreeNomenclature}>(
      environment.apiURL + 'destiny/trees', presentationTreeHashes, { headers: HeaderService.getHeaders() }
    ).pipe(
      tap((presentationTreeNomenclaturesDictionary:{[presentationTreeHash: number]: DestinyPresentationTreeNomenclature}) => {
        this.dataStorage.presentationTrees.titles = presentationTreeNomenclaturesDictionary[DestinyPresentationTreeEnum.Titles];
        this.dataStorage.presentationTrees.archivedTitles = presentationTreeNomenclaturesDictionary[DestinyPresentationTreeEnum.ArchivedTitles];
        this.dataStorage.presentationTrees.catalysts = presentationTreeNomenclaturesDictionary[DestinyPresentationTreeEnum.Catalysts];
        this.dataStorage.presentationTrees.kineticWeaponModels = presentationTreeNomenclaturesDictionary[DestinyPresentationTreeEnum.KineticWeaponModels];
        this.dataStorage.presentationTrees.energyWeaponModels = presentationTreeNomenclaturesDictionary[DestinyPresentationTreeEnum.EnergyWeaponModels];
        this.dataStorage.presentationTrees.powerWeaponModels = presentationTreeNomenclaturesDictionary[DestinyPresentationTreeEnum.PowerWeaponModels];
      })
    )
  }

  setSelectedTitle() {
    const selectedTitle: DestinyPresentationTreeNomenclature | undefined = this.dataStorage.presentationTrees.titles?.childrenNode
      .find(title => title.hash === Number(this.componentToShowArg1))
    if (selectedTitle != undefined) {
      this.dataStorage.componentArgs.selectedTitle = selectedTitle;
    } else {
      this.route.params.subscribe(params => {
        this.router.navigate([`/destiny/${params['platform']}/${params['membership']}/${params['character']}/titles`]);
      });
    }
  }//TODO supprmier tous les isparentcomponentready parce que l affichage se fait uniquement sur cette condition donc always TRUE

  refreshData() {
    this.dataStorage.requestDataRefreshing.next(true);
  }

  ngOnDestroy() {
    this.dataStorage.requestDataRefreshing.unsubscribe();
  }

}
