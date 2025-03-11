import {DestinyItemLocationEnum} from "./enum/DestinyItemLocationEnum";
import {DestinyItemStateEnum} from "./enum/DestinyItemStateEnum";
import {DestinyItemInstanceModel} from "./destiny-item-instance.model";
import {DestinyItemNomenclature} from "./nomenclature/destiny-item.nomenclature";
import {DestinyInventoryBucketEnum} from "./enum/DestinyInventoryBucketsEnum";
import {DestinyItemStatModel} from "./destiny-item-stat.model";
import {DestinySocketModel} from "./destiny-socket.model";
import {DestinyPlugModel} from "./destiny-plug.model";

export class DestinyItemModel {
  itemHash!: number;
  itemNomenclature?: DestinyItemNomenclature;
  itemInstanceId?: string;
  itemInstance?: DestinyItemInstanceModel;
  itemSockets?: DestinySocketModel[];
  itemStats?: DestinyItemStatModel[];
  itemPlugs?: Map<number, DestinyPlugModel[]>;
  quantity!: number;
  location!: DestinyItemLocationEnum;
  bucketHash!: DestinyInventoryBucketEnum;
  transferStatus!: number;
  lockable!: boolean;
  state!: number;
}
