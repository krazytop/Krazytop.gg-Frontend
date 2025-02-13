import {DestinyPrimaryStatModel} from "./destiny-primary-stat.model";
import {DestinyItemDamageTypeEnum} from "./enum/DestinyItemDamageTypeEnum";

export class DestinyItemInstanceModel {
  hash?: string;
  canEquip!: boolean;
  cannotEquipReason!: number; //TODO enum ?
  damageType!: DestinyItemDamageTypeEnum;
  damageTypeHash!: number;
  bucketHash!: number;
  equipRequiredLevel!: number;
  isEquipped!: boolean;
  itemLevel!: number;
  quality!: number;
  primaryStat?: DestinyPrimaryStatModel;
  unlockHashesRequiredToEquip!: number[];
}
