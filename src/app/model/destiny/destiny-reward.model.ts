import {DestinyItemNomenclature} from "./nomenclature/destiny-item.nomenclature";

export class DestinyRewardModel {
  itemHash!: number;
  quantity!: number;
  hasConditionalVisibility!: boolean;
  itemNomenclature!: DestinyItemNomenclature;
}
