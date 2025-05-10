import {DestinyItemInstanceModel} from "./destiny-item-instance.model";
import {DestinyItemNomenclature} from "./nomenclature/destiny-item.nomenclature";
import {DestinyInventoryBucketEnum} from "./enum/DestinyInventoryBucketsEnum";
import {DestinyItemStatModel} from "./destiny-item-stat.model";
import {DestinySocketModel} from "./destiny-socket.model";
import {DestinyPlugModel} from "./destiny-plug.model";
import {DestinyObjectiveProgressModel} from "./destiny-objective-progress.model";

export class DestinyItemModel {
  itemHash!: number;
  itemNomenclature!: DestinyItemNomenclature;
  itemInstanceId?: string;
  itemInstance?: DestinyItemInstanceModel;
  itemSockets?: DestinySocketModel[];
  itemStats?: DestinyItemStatModel[];
  itemPlugs?: Map<number, DestinyPlugModel[]>;
  itemObjectives?: DestinyObjectiveProgressModel[];
  quantity!: number;
  bucketHash!: DestinyInventoryBucketEnum;
  transferStatus!: number;
  lockable!: boolean;
  state!: number;
  overrideStyleItemHash?: number;
  overrideStyleItemNomenclature?: DestinyItemNomenclature;
  expirationDate?: Date
}
