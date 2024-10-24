import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BungieAuthService} from "./bungie-authentification/bungie-auth.service";
import {Subject} from "rxjs";
import {DestinyProfileModel} from "../../model/destiny/destiny-profile.model";
import {DestinyCharacterInventoryModel} from "../../model/destiny/destiny-character-inventory.model";
import {DestinyItemInstanceModel} from "../../model/destiny/destiny-item-instance.model";
import {DestinyItemModel} from "../../model/destiny/destiny-item.model";
import {DestinyLinkedProfilesModel} from "../../model/destiny/destiny-linked-profiles.model";
import {DestinyItemNomenclature} from "../../model/destiny/nomenclature/destiny-item.nomenclature";
import {DestinyPresentationTreeNomenclature} from "../../model/destiny/destiny-presentation-tree.model";
import {DestinyNodeProgressionModel} from "../../model/destiny/destiny-node-progression.model";
import {DestinyRecordNomenclature} from "../../model/destiny/nomenclature/destiny-record.nomenclature";
import {DestinyNomenclatureService} from "../../service/destiny/destiny-nomenclature.service";
import {DestinyComponentArgs} from "../../model/destiny/destiny-component-args";
import {DestinyPresentationTreesModel} from "../../model/destiny/destiny-presentation-trees.model";
import {DestinyDatabaseUpdateService} from "../../service/destiny/destiny-database-update.service";
import {DestinyVendorGroupNomenclature} from "../../model/destiny/nomenclature/destiny-vendor-group.nomenclature";

@Component({
  selector: 'destiny',
  templateUrl: './destiny.component.html',
  styleUrls: ['./destiny.component.css']
})
export class DestinyComponent implements OnInit, OnDestroy { //TODO progression bar models & catalysts must use space-between + margin left & right

  componentToShow: string | undefined;
  isThisComponentReady: boolean = false;
  isFirstDisplay: boolean = true;
  requestDataRefreshing: Subject<boolean> = new Subject<boolean>();
  lastUpdate: Date = new Date();
  isDatabaseUpToDate = false;

  componentArgs: DestinyComponentArgs = new DestinyComponentArgs();

  profile: DestinyProfileModel = new DestinyProfileModel();
  itemNomenclatures: Map<number, DestinyItemNomenclature> = new Map();
  characterTitleNomenclatures: Map<number, DestinyRecordNomenclature> = new Map();
  vendorGroups: DestinyVendorGroupNomenclature[] = [];
  presentationTrees: DestinyPresentationTreesModel = new DestinyPresentationTreesModel();

  public static readonly ASSET_URL: string = "https://www.bungie.net";

  constructor(private route: ActivatedRoute, private bungieAuthService: BungieAuthService, private router: Router, private nomenclatureService: DestinyNomenclatureService, private databaseUpdateService: DestinyDatabaseUpdateService) {}

  private platform?: number;
  private membership?: string;
  currentlyUpdating = false;

  async ngOnInit() {
    this.route.params.subscribe(params => {
      this.platform = params['platform'];
      this.membership = params['membership'];
      this.componentToShow = params['component'];
    });
    await this.databaseUpdateService.manageDatabase();
    this.isDatabaseUpToDate = true;
    if (this.isFirstDisplay) {
      this.requestDataRefreshing.subscribe(async requestDataRefreshing => {
        if (requestDataRefreshing) {
          this.currentlyUpdating = true;
          await this.retrieveAllDestinyData(this.platform!, this.membership!);
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
    this.vendorGroups = await this.getVendors(this.platform!, this.membership!, this.profile.characters[0].characterId)
    this.manageComponentArgs();
    this.isThisComponentReady = true;
  }

  manageComponentArgs() {
    this.route.queryParams.subscribe(params => {
      if(this.componentToShow === 'titles') this.setSelectedTitle(Number(params['hash'])); //TODO ne pas set mais directement get dans l'argument du composant
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
    const response = await fetch(`https://www.bungie.net/Platform/Destiny2/${platform}/Profile/${membership}/?components=102,103,200,201,205,300,700,900`, {headers: this.bungieAuthService.getHeaders()})
    const json = await response.json();
    const destinyProfile: DestinyProfileModel = new DestinyProfileModel();
    destinyProfile.characters = Object.values(json['Response']['characters']['data']);
    destinyProfile.profileCurrencies = Object.values(json['Response']['profileCurrencies']['data']['items']);
    destinyProfile.profileInventory = Object.values(json['Response']['profileInventory']['data']['items']);
    destinyProfile.characterInventories = Object.entries(json['Response']['characterInventories']['data'])
      .map(([characterHash, items]) => {
        return  {characterHash: characterHash, items: (items as { [items: string]:DestinyItemModel[] })['items']} as DestinyCharacterInventoryModel;
      });
    destinyProfile.characterEquipment = Object.entries(json['Response']['characterEquipment']['data'])
      .map(([characterHash, items]) => {
        return  {characterHash: characterHash, items: (items as { [items: string]:DestinyItemModel[] })['items']} as DestinyCharacterInventoryModel;
      });
    Object.entries(json['Response']['itemComponents']['instances']['data'])
      .forEach(([itemHash, item]) => {
        destinyProfile.itemInstances.set(Number(itemHash), item as DestinyItemInstanceModel);
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
    const selectedTitle: DestinyPresentationTreeNomenclature | undefined = this.presentationTrees.titles?.childrenNode
      .find(title => title.hash === hash)
    this.componentArgs.selectedTitle = selectedTitle;
    if (selectedTitle === undefined) {
      const params = this.route.snapshot.paramMap;
      this.router.navigate([`/destiny/${params.get('platform')}/${params.get('membership')}/${params.get('character')}/titles`]);
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

}
