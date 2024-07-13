import {DestinyTierTypeEnum} from "../enum/DestinyTierTypeEnum";
import {DestinyInventoryBucketEnum} from "../enum/DestinyInventoryBucketsEnum";

export class DestinyItemNomenclature {
  hash!: number;
  name!: string;
  description!: string;
  icon!: string;
  itemTypeDisplayName!: string;
  tierTypeName!: string;
  iconWatermark!: string;
  maxStackSize!: number;
  bucketTypeHash!: DestinyInventoryBucketEnum;
  recoveryBucketTypeHash!: number;
  tierTypeHash!: DestinyTierTypeEnum;
  equipmentSlotTypeHash?: number;
  summaryItemHash!: number;
  specialItemType!: number;
  itemType!: number;
  itemSubType!: number;
  classType!: number;
  defaultDamageType!: number;
  isInstanceItem!: boolean;
  nonTransferrable!: boolean;
  equippable!: boolean;
}
