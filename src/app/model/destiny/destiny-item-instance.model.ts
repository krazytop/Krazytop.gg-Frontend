import {DestinyPrimaryStatModel} from "./destiny-primary-stat.model";

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
