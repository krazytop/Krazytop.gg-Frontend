import {DestinyItemModel} from "./destiny-item.model";
import {DestinyStatNomenclature} from "./nomenclature/destiny-stat.nomenclature";
import {DestinyItemNomenclature} from "./nomenclature/destiny-item.nomenclature";

export class DestinyItemOverlayModel {
  item?: DestinyItemModel;
  statNomenclatures: Map< number, DestinyStatNomenclature> = new Map();
  plugsNomenclatures: Map< number, DestinyItemNomenclature> = new Map();
  top!: number;
  left!: number;
}
