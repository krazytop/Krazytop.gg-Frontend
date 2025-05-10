import {DestinyTierTypeEnum} from "../enum/DestinyTierTypeEnum";
import {DestinyInventoryBucketEnum} from "../enum/DestinyInventoryBucketsEnum";
import {DestinyItemTypeEnum} from "../enum/DestinyItemTypeEnum";
import {DestinyItemStatModel} from "../destiny-item-stat.model";
import {DestinySocketCategoryModel} from "../destiny-socket-category.model";
import {DestinyRewardModel} from "../destiny-reward.model";

export class DestinyItemNomenclature {
  hash!: number
  name!: string;
  description!: string;
  icon?: string;
  itemTypeDisplayName!: string;
  tierTypeName!: string;
  iconWatermark?: string;
  maxStackSize!: number;
  bucketTypeHash!: DestinyInventoryBucketEnum;
  recoveryBucketTypeHash!: number;
  tierTypeHash!: DestinyTierTypeEnum;
  equipmentSlotTypeHash?: number;
  summaryItemHash!: number;
  specialItemType!: number;
  itemType!: DestinyItemTypeEnum;
  itemSubType!: number;
  classType!: number;
  defaultDamageType!: number;
  isInstanceItem!: boolean;
  nonTransferrable!: boolean;
  equippable!: boolean;
  suppressExpirationWhenObjectivesComplete?: boolean;
  rewards?: DestinyRewardModel[];
  investmentStats?: DestinyItemStatModel[];
  socketCategories?: DestinySocketCategoryModel[];
}
