import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BungieAuthService} from "../../service/destiny/bungie-auth.service";
import {Subject} from "rxjs";
import {DestinyProfileModel} from "../../model/destiny/destiny-profile.model";
import {DestinyCharacterInventoryModel} from "../../model/destiny/destiny-character-inventory.model";
import {DestinyItemInstanceModel} from "../../model/destiny/destiny-item-instance.model";
import {DestinyItemModel} from "../../model/destiny/destiny-item.model";
import {DestinyLinkedProfilesModel} from "../../model/destiny/destiny-linked-profiles.model";
import {DestinyItemNomenclature} from "../../model/destiny/nomenclature/destiny-item.nomenclature";
import {DestinyPresentationTreeModel} from "../../model/destiny/destiny-presentation-tree.model";
import {DestinyNodeProgressionModel} from "../../model/destiny/destiny-node-progression.model";
import {DestinyRecordNomenclature} from "../../model/destiny/nomenclature/destiny-record.nomenclature";
import {DestinyNomenclatureService} from "../../service/destiny/destiny-nomenclature.service";
import {DestinyUrlArgs} from "../../model/destiny/destiny-url-args";
import {DestinyPresentationTreesModel} from "../../model/destiny/destiny-presentation-trees.model";
import {DestinyDatabaseUpdateService} from "../../service/destiny/destiny-database-update.service";
import {DestinyVendorGroupNomenclature} from "../../model/destiny/nomenclature/destiny-vendor-group.nomenclature";
import {DestinyCollectibleModel} from "../../model/destiny/destiny-collectible.model";
import {DestinyOverlayService} from "../../service/destiny/destiny-overlay.service";
import {DestinyStatNomenclature} from "../../model/destiny/nomenclature/destiny-stat.nomenclature";
import {DestinyItemStatModel} from "../../model/destiny/destiny-item-stat.model";
import {DestinyPlugModel} from "../../model/destiny/destiny-plug.model";
import {DestinySocketModel} from "../../model/destiny/destiny-socket.model";
import {DestinyObjectiveProgressModel} from "../../model/destiny/destiny-objective-progress.model";
import {DestinyObjectiveNomenclature} from "../../model/destiny/nomenclature/destiny-objective.nomenclature";
import {DestinyItemService} from "../../service/destiny/destiny-item.service";

@Component({
  selector: 'destiny',
  templateUrl: './destiny.component.html',
  styleUrls: ['./destiny.component.css']
})
export class DestinyComponent implements OnInit, OnDestroy { //TODO progression bar models & catalysts must use space-between + margin left & right

  isThisComponentReady: boolean = false;
  isFirstDisplay: boolean = true;
  requestDataRefreshing: Subject<boolean> = new Subject<boolean>();
  isDatabaseUpToDate = false;
  lastUpdate: Date = new Date();

  urlArgs: DestinyUrlArgs = new DestinyUrlArgs();

  profile: DestinyProfileModel = new DestinyProfileModel();
  itemNomenclatures: Map<number, DestinyItemNomenclature> = new Map();
  statNomenclatures: Map<number, DestinyStatNomenclature> = new Map();//TODO réfléchir si on garde ou pas
  characterTitleNomenclatures: Map<number, DestinyRecordNomenclature> = new Map();
  vendorGroups: DestinyVendorGroupNomenclature[] = [];
  presentationTrees: DestinyPresentationTreesModel = new DestinyPresentationTreesModel();

  currentlyUpdating = false;

  public static readonly ASSET_URL: string = "https://www.bungie.net";

  constructor(private route: ActivatedRoute, private bungieAuthService: BungieAuthService, private router: Router, private nomenclatureService: DestinyNomenclatureService, private databaseUpdateService: DestinyDatabaseUpdateService, protected overlayService: DestinyOverlayService, private itemService: DestinyItemService) {}

  async ngOnInit() {
    this.route.params.subscribe(params => {
      this.urlArgs.platform = params['platform'];
      this.urlArgs.membership = params['membership'];
      this.urlArgs.character = params['character'];
      this.urlArgs.component = params['component'];
    });
    await this.databaseUpdateService.manageDatabase();
    this.isDatabaseUpToDate = true;
    if (this.isFirstDisplay) {
      this.requestDataRefreshing.subscribe(async requestDataRefreshing => {
        if (requestDataRefreshing) {
          this.currentlyUpdating = true;
          await this.retrieveAllDestinyData(this.urlArgs.platform!, this.urlArgs.membership!);
          this.lastUpdate = new Date();
          this.currentlyUpdating = false;
        }
      });
      this.refreshData();
      this.isFirstDisplay = false;
    } else {
      this.manageComponentArgs();
      this.isThisComponentReady = true;
    }
  }

  private async retrieveAllDestinyData(platform: number, membership: string) {
    this.requestDataRefreshing.next(false);
    if (await this.bungieAuthService.checkTokenValidity()) {
      await this.getProfile(platform, membership);
      await this.manageAllRequest(platform, membership);
    } else {
      //TODO alert + deconnection
    }
  }

  async manageAllRequest(platform: number, membership: string) {
    await this.getLinkedProfile(platform, membership);
    this.characterTitleNomenclatures = await this.nomenclatureService.getRecordNomenclatures(this.profile.characters.map(character => character.titleRecordHash));
    this.presentationTrees = await this.nomenclatureService.getPresentationTreesNomenclatures();
    this.itemNomenclatures = await this.nomenclatureService.getItemNomenclatures(this.profile, this.presentationTrees);
    this.statNomenclatures = await this.nomenclatureService.getStatNomenclatures();
    this.overlayService.itemOverlay.statNomenclatures = this.statNomenclatures;
    this.itemService.plugsNomenclatures = await this.nomenclatureService.getPlugNomenclatures(this.profile.itemPlugs, this.profile.itemSockets);
    this.overlayService.itemOverlay.objectiveNomenclatures = await this.nomenclatureService.getObjectiveNomenclatures(this.profile.itemObjectives);
    this.vendorGroups = await this.getVendors(this.urlArgs.platform!, this.urlArgs.membership!, this.profile.characters[0].characterId);
    this.manageComponentArgs();
    this.isThisComponentReady = true;
  }

  manageComponentArgs() {
    this.route.queryParams.subscribe(params => {
      const component = this.route.snapshot.paramMap.get('component');
      const hash = params['hash'];
      if (hash) {
        if(component === 'titles') this.setSelectedTitle(Number(hash)); //TODO ne pas set mais directement get dans l'argument du composant (apres si le hash n existe pas il est important de le voir avant ?)
        if(component === 'badges') this.setSelectedBadge(Number(hash));
      } else {
        this.urlArgs.selectedTitle = undefined;
        this.urlArgs.selectedBadge = undefined;
      }
    });
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

  async getProfile(platform: number, membership: string) {
    const response = await fetch(`https://www.bungie.net/Platform/Destiny2/${platform}/Profile/${membership}/?components=102,103,200,201,205,300,301,304,305,310,700,800,900`, {headers: this.bungieAuthService.getHeaders()})
    const json = await response.json();
    const destinyProfile: DestinyProfileModel = new DestinyProfileModel();
    destinyProfile.characters = Object.values(json['Response']['characters']['data']);
    destinyProfile.profileCurrencies = Object.values(json['Response']['profileCurrencies']['data']['items']);
    destinyProfile.profileInventory = Object.values(json['Response']['profileInventory']['data']['items']);
    destinyProfile.characterInventories = Object.entries(json['Response']['characterInventories']['data'])
      .map(([characterHash, items]) => {
        return {characterHash: characterHash, items: (items as { [items: string]:DestinyItemModel[] })['items']} as DestinyCharacterInventoryModel;
      });
    destinyProfile.characterEquipment = Object.entries(json['Response']['characterEquipment']['data'])
      .map(([characterHash, items]) => {
        return {characterHash: characterHash, items: (items as { [items: string]:DestinyItemModel[] })['items']} as DestinyCharacterInventoryModel;
      });
    Object.entries(json['Response']['characterCollectibles']['data'])
      .map(([characterHash, collectibles]) => {
        destinyProfile.characterCollectibles.set(Number(characterHash), (collectibles as any)['collectibles'] as Map<number, DestinyCollectibleModel>)
      });
    destinyProfile.profileCollectibles = json['Response']['profileCollectibles']['data']['collectibles'];
    Object.entries(json['Response']['itemComponents']['instances']['data'])
      .forEach(([itemHash, item]) => {
        destinyProfile.itemInstances.set(Number(itemHash), item as DestinyItemInstanceModel);
      });
    Object.entries(json['Response']['itemComponents']['objectives']['data'])
      .forEach(([itemHash, objectives]) => {
        destinyProfile.itemObjectives.set(Number(itemHash), (objectives as any)['objectives'] as DestinyObjectiveProgressModel[]);
      });
    Object.entries(json['Response']['itemComponents']['stats']['data'])
      .forEach(([itemHash, item]) => {
        destinyProfile.itemStats.set(Number(itemHash), Object.entries((item as any)['stats']).map(([, stat]) =>  stat as DestinyItemStatModel));
      });
    Object.entries(json['Response']['itemComponents']['sockets']['data'])
      .forEach(([itemHash, item]) => {
        destinyProfile.itemSockets.set(Number(itemHash), (item as any)['sockets'] as DestinySocketModel[]);
      });
    Object.entries(json['Response']['itemComponents']['reusablePlugs']['data'])
      .forEach(([itemHash, item]) => {
        destinyProfile.itemPlugs.set(Number(itemHash), new Map(Object.entries((item as any)['plugs'])
          .map(([plugHash, plugList]) => [Number(plugHash), plugList as DestinyPlugModel[]])));
      });
    Object.entries((json['Response']['characterRecords']['data'][destinyProfile.characters[0].characterId]['records'] as { [nodeHash: string]: DestinyNodeProgressionModel }))
      .forEach(([nodeHash, node]) => {
        destinyProfile.presentationNodeProgress.set(Number(nodeHash), node);
      });
    Object.entries(json['Response']['profileRecords']['data']['records'] as { [nodeHash: string]: DestinyNodeProgressionModel })
      .forEach(([nodeHash, node]) => {
        destinyProfile.presentationNodeProgress.set(Number(nodeHash), node);
      });
    Object.entries((json['Response']['characterPresentationNodes']['data'][destinyProfile.characters[0].characterId]['nodes'] as { [nodeHash: string]: DestinyNodeProgressionModel }))
      .forEach(([nodeHash, node]) => {
        destinyProfile.presentationNodeProgress.set(Number(nodeHash), node);
      });
    Object.entries((json['Response']['profilePresentationNodes']['data']['nodes'] as { [nodeHash: string]: DestinyNodeProgressionModel }))
      .forEach(([nodeHash, node]) => {
        destinyProfile.presentationNodeProgress.set(Number(nodeHash), node);
      });
    this.profile = destinyProfile;
  }

  setSelectedTitle(hash: number) {
    const selectedTitle: DestinyPresentationTreeModel | undefined = this.presentationTrees.titles.childrenNode
      .find(title => title.hash === hash)
    this.urlArgs.selectedTitle = selectedTitle;
    if (selectedTitle === undefined) {
      this.router.navigate([`/destiny/${this.urlArgs.platform}/${this.urlArgs.membership}/${this.urlArgs.character}/titles`]);//TODO remove ?hash plutot
    }
  }

  setSelectedBadge(hash: number) {
    const selectedBadge: DestinyPresentationTreeModel | undefined = this.presentationTrees.badges.childrenNode
      .find(badge => badge.hash === hash)
    this.urlArgs.selectedBadge = selectedBadge;
    if (selectedBadge === undefined) {
      this.router.navigate([`/destiny/${this.urlArgs.platform}/${this.urlArgs.membership}/${this.urlArgs.character}/badges`]);//TODO remove ?hash plutot
    }
  }

  async getVendors(platform: number, membership: string, character: string) {
    const response = await fetch(`https://www.bungie.net/Platform/Destiny2/${platform}/Profile/${membership}/Character/${character}/Vendors/?components=400`, {headers: this.bungieAuthService.getHeaders()});
    const json = await response.json();
    const vendorGroupIds: number[] = json['Response']['vendorGroups']['data']['groups'].map((group: any) => group['vendorGroupHash']);
    let vendorGroupNomenclatures: DestinyVendorGroupNomenclature[] = [...(await this.nomenclatureService.getVendorNomenclatures(vendorGroupIds)).values()];
    const vendorsData = json['Response']['vendors']['data'];
    for (const group of vendorGroupNomenclatures) {
      for (const vendor of group.vendors) {
        const vendorData = vendorsData[vendor.vendorNomenclature.hash];
        if (vendorData && vendorData['progression']) {
          vendor.nextRefreshDate = vendorData['nextRefreshDate'];
          vendor.progression = vendorData['progression'];
          vendor.progression.progressionNomenclature = (await this.nomenclatureService.getProgressionNomenclatures(vendor.progression.progressionHash));
        } else {
          group.vendors = group.vendors.filter(vendorNotHere => vendor.vendorNomenclature.hash !== vendorNotHere.vendorNomenclature.hash);
        }
      }
    }
    vendorGroupNomenclatures = vendorGroupNomenclatures.filter(group => group.vendors.length > 0);
    vendorGroupNomenclatures.sort((a, b) => b.vendors.length - a.vendors.length)
    return vendorGroupNomenclatures;
  }

  refreshData() {
    this.requestDataRefreshing.next(true);
  }

  ngOnDestroy() {
    this.requestDataRefreshing.unsubscribe();
  }

  protected readonly Math = Math;
}
