import {ItemLocationEnum} from "./enum/ItemLocationEnum";
import {ItemStateEnum} from "./enum/ItemStateEnum";
import {DestinyItemInstanceModel} from "./destiny-item-instance.model";
import {DestinyItemNomenclature} from "./nomenclature/destiny-item.nomenclature";

export class DestinyItemModel {
  itemHash!: number;
  itemNomenclature?: DestinyItemNomenclature;
  itemInstanceId!: string;
  itemInstance?: DestinyItemInstanceModel;
  quantity!: number;
  location!: ItemLocationEnum;
  bucketHash!: number;
  transferStatus!: number;
  lockable!: boolean;
  state!: ItemStateEnum;
}
