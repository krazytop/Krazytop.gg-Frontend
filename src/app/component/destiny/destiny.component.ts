import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BungieAuthService} from "./bungie-authentification/bungie-auth.service";
import {map, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {DestinyProfileModel} from "../../model/destiny/destiny-profile.model";
import {DestinyCharacterInventoryModel} from "../../model/destiny/destiny-character-inventory.model";
import {DestinyItemInstanceModel} from "../../model/destiny/destiny-item-instance.model";
import {DestinyItemModel} from "../../model/destiny/destiny-item.model";
import {DestinyLinkedProfilesModel} from "../../model/destiny/destiny-linked-profiles.model";
import {DestinyItemNomenclature} from "../../model/destiny/nomenclature/destiny-item.nomenclature";
import {DestinyPresentationTreeNomenclature} from "../../model/destiny/destiny-presentation-tree.model";
import {DestinyNodeProgressionModel} from "../../model/destiny/destiny-node-progression.model";
import {DestinyRecordNomenclature} from "../../model/destiny/nomenclature/destiny-record.nomenclature";
import {DestinyNomenclatureService} from "../../service/destiny/DestinyNomenclatureService";
import {DestinyComponentArgs} from "../../model/destiny/destiny-component-args";
import {DestinyPresentationTreesModel} from "../../model/destiny/destiny-presentation-trees.model";
import {DestinyDatabaseApi} from "../../service/destiny/DestinyDatabaseApi";
import {DestinyDatabaseUpdateService} from "../../service/destiny/DestinyDatabaseUpdateService";
import {DestinyVendorGroupNomenclature} from "../../model/destiny/nomenclature/destiny-vendor-group.nomenclature";

@Component({
  selector: 'destiny',
  templateUrl: './destiny.component.html',
  styleUrls: ['./destiny.component.css']
})
export class DestinyComponent implements OnInit, OnDestroy {

  componentToShow: string | undefined;
  componentToShowArg1: string | undefined;
  isThisComponentReady: boolean = false;
  isFirstDisplay: boolean = true;
  requestDataRefreshing: Subject<boolean> = new Subject<boolean>();

  componentArgs: DestinyComponentArgs = new DestinyComponentArgs();

  profile: DestinyProfileModel = new DestinyProfileModel();
  itemNomenclatures: Map<number, DestinyItemNomenclature> = new Map();
  characterTitleNomenclatures: Map<number, DestinyRecordNomenclature> = new Map();
  vendorNomenclatures: Map<number, DestinyVendorGroupNomenclature> = new Map();
  presentationTrees: DestinyPresentationTreesModel = new DestinyPresentationTreesModel();

  public static ASSET_URL: string = "https://www.bungie.net";

  constructor(private http: HttpClient, private route: ActivatedRoute, private bungieAuthService: BungieAuthService, private router: Router, private nomenclatureService: DestinyNomenclatureService, private databaseApi: DestinyDatabaseApi, private databaseUpdateService: DestinyDatabaseUpdateService) {}

  async ngOnInit() {
    let platform: number | undefined;
    let membership: string | undefined;
    this.route.params.subscribe(params => {
      platform = params['platform'];
      membership = params['membership'];
      this.componentToShow = params['component'];
      this.componentToShowArg1 = params['arg1'];
    });
    await this.databaseUpdateService.manageDatabase(); //TODO arranger pour tout faire en meme temps
    if (this.isFirstDisplay) {
      this.requestDataRefreshing.subscribe(requestDataRefreshing => {
        if (requestDataRefreshing) {
          this.retrieveAllDestinyData(platform, membership);
        }
      });
      this.refreshData();
      this.isFirstDisplay = false;
    } else {
      this.manageComponentArgs();
      this.isThisComponentReady = true;
    }
  }

  private retrieveAllDestinyData(platform: number | undefined, membership: string | undefined) {
    this.requestDataRefreshing.next(false);
    this.bungieAuthService.checkTokenValidity().subscribe(isTokenValid => {
      if (isTokenValid) {
        this.getProfile(platform!, membership!).subscribe(async () => {
          if (this.profile != null) {
            if (this.profile.characters.length === 0) {
              console.log("Need at least one character"); //TODO alert + deconnection
              await this.router.navigate(['/']);
            } else {
              await this.manageAllRequest(platform!, membership!);
            }
          } else {
            console.log("Failed to load your Destiny profile"); //TODO alert + deconnection
            await this.router.navigate(['/']);
          }
        })
      } else {
        //TODO alert + deconnection
      }
    });
  }

  async manageAllRequest(platform: number, membership: string) {
    await this.getLinkedProfile(platform, membership);
    this.itemNomenclatures = await this.nomenclatureService.getItemNomenclatures(this.profile);
    this.characterTitleNomenclatures = await this.nomenclatureService.getRecordNomenclatures(this.profile.characters.map(character => character.titleRecordHash));
    this.presentationTrees = await this.nomenclatureService.getPresentationTreesNomenclatures();
    this.vendorNomenclatures = await this.nomenclatureService.getVendorNomenclatures();
    this.manageComponentArgs();
    this.isThisComponentReady = true;
  }

  manageComponentArgs() {
    if(this.componentToShow === 'titles' && this.componentToShowArg1 !== undefined) this.setSelectedTitle();
  }

  async getLinkedProfile(platform: number, membership: string) {
    let response: any = await fetch(`https://www.bungie.net/Platform/Destiny2/${platform}/Profile/${membership}/LinkedProfiles/?getAllMemberships=true`, {headers: this.bungieAuthService.getHeaders()})
    response = (await response.json())['Response'];
    let profiles: DestinyLinkedProfilesModel[] = [];
    profiles.push(...Object.values(response['profiles'] as DestinyProfileModel));
    profiles.push(response['bnetMembership'] as DestinyLinkedProfilesModel);
    response['profilesWithErrors'].forEach((profileWithErrors: any) => profiles.push(profileWithErrors['infoCard'] as DestinyLinkedProfilesModel));
    this.profile.linkedProfiles = profiles;
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
          this.profile = destinyProfile;
        })
      );
  }

  setSelectedTitle() {
    const selectedTitle: DestinyPresentationTreeNomenclature | undefined = this.presentationTrees.titles?.childrenNode
      .find(title => title.hash === Number(this.componentToShowArg1))
    if (selectedTitle != undefined) {
      this.componentArgs.selectedTitle = selectedTitle;
    } else {
      this.route.params.subscribe(params => {
        this.router.navigate([`/destiny/${params['platform']}/${params['membership']}/${params['character']}/titles`]);
      });
    }
  }//TODO supprmier tous les isparentcomponentready parce que l affichage se fait uniquement sur cette condition donc always TRUE

  refreshData() {
    this.requestDataRefreshing.next(true);
  }

  ngOnDestroy() {
    this.requestDataRefreshing.unsubscribe();
  }

}
