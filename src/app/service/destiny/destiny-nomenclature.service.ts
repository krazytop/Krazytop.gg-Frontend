import {DestinyDatabaseApi} from "./destiny-database.api";
import {Injectable} from "@angular/core";
import {DestinyProfileModel} from "../../model/destiny/destiny-profile.model";
import {Engrams, MainCurrencies, Synthweaves} from "../../model/destiny/enum/DestinyMainInventoryEnum";
import {DestinyPresentationTreesModel} from "../../model/destiny/destiny-presentation-trees.model";
import {DestinyPresentationTreeModel} from "../../model/destiny/destiny-presentation-tree.model";
import {
  DestinyPresentationTreeEnum,
  getAllPresentationTrees
} from "../../model/destiny/enum/DestinyPresentationTreeEnum";
import {DestinyItemNomenclature} from "../../model/destiny/nomenclature/destiny-item.nomenclature";
import {DestinySocketCategoryEnum} from "../../model/destiny/enum/DestinySocketCategoryEnum";
import {DestinyItemInstanceModel} from "../../model/destiny/destiny-item-instance.model";
import {DestinyPlugModel} from "../../model/destiny/destiny-plug.model";
import {DestinySocketModel} from "../../model/destiny/destiny-socket.model";
import {DestinyObjectiveProgressModel} from "../../model/destiny/destiny-objective-progress.model";

@Injectable({ providedIn: 'root' })
export class DestinyNomenclatureService {

  constructor(private databaseApi: DestinyDatabaseApi) {
  }

  async getItemNomenclatures(profile: DestinyProfileModel, presentationTrees: DestinyPresentationTreesModel) {
    const hashes: number[] = [...new Set([
      ...profile.profileInventory.flatMap(item => [item.itemHash, item.overrideStyleItemHash ?? item.itemHash]),
      ...profile.profileCurrencies.flatMap(item => item.itemHash),
      ...profile.characterEquipment.flatMap(inventory => inventory.items.flatMap(item => [item.itemHash, item.overrideStyleItemHash ?? item.itemHash])),
      ...profile.characterInventories.flatMap(inventory => inventory.items.flatMap(item => [item.itemHash, item.overrideStyleItemHash ?? item.itemHash])),
      ...presentationTrees.badges.childrenNode.flatMap(badge => badge.childrenNode.flatMap(character => character.childrenCollectible.map(collectible => collectible.itemHash))),
      ...MainCurrencies, ...Engrams, ...Synthweaves])];//TODO reward
    const itemsBeforeRewards = await this.databaseApi.getAllObjectsByIds(hashes, DestinyDatabaseApi.ITEM_STORE);
    const rewards = [...new Set(Array.from(itemsBeforeRewards.values()).flatMap((item: DestinyItemNomenclature) => item.rewards?.flatMap(rewards => rewards.itemHash) ?? []))];
    return new Map([...(await this.databaseApi.getAllObjectsByIds(rewards, DestinyDatabaseApi.ITEM_STORE)).entries(), ...(await this.databaseApi.getAllObjectsByIds(hashes, DestinyDatabaseApi.ITEM_STORE)).entries() ]);
  }

  async getObjectiveNomenclatures(itemObjectives: Map<number, DestinyObjectiveProgressModel[]>) {
    const hashes = Array.from(itemObjectives.values()).flat().map(o => o.objectiveHash)
    return await this.databaseApi.getAllObjectsByIds(Array.from(new Set(hashes)), DestinyDatabaseApi.OBJECTIVE_STORE)
  }

  async getRecordNomenclatures(hashes: number[]) {
    hashes = Array.from(new Set(hashes))
    return await this.databaseApi.getAllObjectsByIds(hashes, DestinyDatabaseApi.RECORD_STORE)
  }

  async getStatNomenclatures() {
    return await this.databaseApi.getAllObjects(DestinyDatabaseApi.STAT_STORE)
  }

  async getPresentationTreesNomenclatures() {
    let treesModel: DestinyPresentationTreesModel = new DestinyPresentationTreesModel();
    const nomenclature: Map<number, DestinyPresentationTreeModel> = await this.databaseApi.getAllObjectsByIds(getAllPresentationTrees(), DestinyDatabaseApi.PRESENTATION_TREE_STORE) as unknown as  Map<number, DestinyPresentationTreeModel>;
    treesModel.archivedTitles = nomenclature.get(DestinyPresentationTreeEnum.ArchivedTitles)!;
    treesModel.titles = nomenclature.get(DestinyPresentationTreeEnum.Titles)!;
    treesModel.energyWeaponModels = nomenclature.get(DestinyPresentationTreeEnum.EnergyWeaponModels)!;
    treesModel.kineticWeaponModels = nomenclature.get(DestinyPresentationTreeEnum.KineticWeaponModels)!;
    treesModel.powerWeaponModels = nomenclature.get(DestinyPresentationTreeEnum.PowerWeaponModels)!;
    treesModel.catalysts = nomenclature.get(DestinyPresentationTreeEnum.Catalysts)!;
    treesModel.badges = nomenclature.get(DestinyPresentationTreeEnum.Badges)!;
    return treesModel;
  }

  async getVendorNomenclatures(vendorIds: number[]) {
    return await this.databaseApi.getAllObjectsByIds(vendorIds, DestinyDatabaseApi.VENDOR_STORE);
  }

  async getProgressionNomenclatures(progressionIds: number) {
    const nomenclatures = await this.databaseApi.getAllObjectsByIds([progressionIds], DestinyDatabaseApi.PROGRESSION_STORE);
    return [...nomenclatures.values()][0];
  }

  async getPlugNomenclatures(plugsMap: Map<number, Map<number, DestinyPlugModel[]>>, itemSockets: Map<number, DestinySocketModel[]>) {
    let hashes: number[] = Array.from(new Set([
      ...[...plugsMap.values()].flatMap((plugsSubMap: Map<number, DestinyPlugModel[]>) =>
        [...plugsSubMap.values()].flatMap((plugs: DestinyPlugModel[]) =>
          plugs.map(plug => plug.plugItemHash)
        )
      ), ...[...itemSockets.values()].flatMap((sockets: DestinySocketModel[]) => sockets.map(socket => socket.plugHash!).filter(socket => socket != undefined))
    ]));
    return await this.databaseApi.getAllObjectsByIds(hashes, DestinyDatabaseApi.ITEM_STORE);
  }

}
