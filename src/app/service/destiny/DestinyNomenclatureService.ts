import {DestinyDatabaseApi} from "./DestinyDatabaseApi";
import {Injectable} from "@angular/core";
import {DestinyProfileModel} from "../../model/destiny/destiny-profile.model";
import {Engrams, MainCurrencies} from "../../model/destiny/enum/DestinyMainInventoryEnum";
import {DestinyPresentationTreesModel} from "../../model/destiny/destiny-presentation-trees.model";
import {DestinyPresentationTreeNomenclature} from "../../model/destiny/destiny-presentation-tree.model";
import {
  DestinyPresentationTreeEnum,
  getAllPresentationTrees
} from "../../model/destiny/enum/DestinyPresentationTreeEnum";

@Injectable({ providedIn: 'root' })
export class DestinyNomenclatureService {

  constructor(private databaseApi: DestinyDatabaseApi) {
  }

  async getItemNomenclatures(profile: DestinyProfileModel) {
    const hashes: number[] = [...new Set([
      ...profile.profileInventory.flatMap(item => item.itemHash),
      ...profile.profileCurrencies.flatMap(item => item.itemHash),
      ...profile.characterEquipment.flatMap(inventory => inventory.items.flatMap(item => item.itemHash)),
      ...profile.characterInventories.flatMap(inventory => inventory.items.flatMap(item => item.itemHash)),
      ...MainCurrencies, ...Engrams])];
    return await this.databaseApi.getAllObjectsByIds(hashes, DestinyDatabaseApi.ITEM_STORE)
  }

  async getRecordNomenclatures(hashes: number[]) {
    hashes = Array.from(new Set(hashes))
    return await this.databaseApi.getAllObjectsByIds(hashes, DestinyDatabaseApi.RECORD_STORE)
  }

  async getPresentationTreesNomenclatures() {
    let treesModel: DestinyPresentationTreesModel = new DestinyPresentationTreesModel();
    const nomenclature: Map<number, DestinyPresentationTreeNomenclature> = await this.databaseApi.getAllObjectsByIds(getAllPresentationTrees(), DestinyDatabaseApi.PRESENTATION_TREE_STORE) as unknown as  Map<number, DestinyPresentationTreeNomenclature>;
    treesModel.archivedTitles = nomenclature.get(DestinyPresentationTreeEnum.ArchivedTitles);
    treesModel.titles = nomenclature.get(DestinyPresentationTreeEnum.Titles);
    treesModel.energyWeaponModels = nomenclature.get(DestinyPresentationTreeEnum.EnergyWeaponModels);
    treesModel.kineticWeaponModels = nomenclature.get(DestinyPresentationTreeEnum.KineticWeaponModels);
    treesModel.powerWeaponModels = nomenclature.get(DestinyPresentationTreeEnum.PowerWeaponModels);
    treesModel.catalysts = nomenclature.get(DestinyPresentationTreeEnum.Catalysts);
    return treesModel;
  }

  async getVendorNomenclatures(vendorIds: number[]) {
    return await this.databaseApi.getAllObjectsByIds(vendorIds, DestinyDatabaseApi.VENDOR_STORE);
  }

  async getProgressionNomenclatures(progressionIds: number) {
    const nomenclatures = await this.databaseApi.getAllObjectsByIds([progressionIds], DestinyDatabaseApi.PROGRESSION_STORE);
    return [...nomenclatures.values()][0];
  }

}
