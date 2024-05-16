import {DestinyPrimaryStatModel} from "./destiny-primary-stat.model";
import {DestinyItemNomenclature} from "./nomenclature/destiny-item.nomenclature";

export class DestinyItemInstanceModel {
  hash?: string;
  canEquip!: boolean;
  cannotEquipReason!: number; //TODO enum ?
  damageType!: number;
  damageTypeHash!: number;
  bucketHash!: number;
  equipRequiredLevel!: number;
  isEquipped!: boolean;
  itemLevel!: number;
  quality!: number;
  primaryStat!: DestinyPrimaryStatModel;
  unlockHashesRequiredToEquip!: number[];
}
