import {DestinyItemLocationEnum} from "./enum/DestinyItemLocationEnum";
import {DestinyItemStateEnum} from "./enum/DestinyItemStateEnum";
import {DestinyItemInstanceModel} from "./destiny-item-instance.model";
import {DestinyItemNomenclature} from "./nomenclature/destiny-item.nomenclature";

export class DestinyItemModel {
  itemHash!: number;
  itemNomenclature?: DestinyItemNomenclature;
  itemInstanceId!: string;
  itemInstance?: DestinyItemInstanceModel;
  quantity!: number;
  location!: DestinyItemLocationEnum;
  bucketHash!: number;
  transferStatus!: number;
  lockable!: boolean;
  state!: number;
}
