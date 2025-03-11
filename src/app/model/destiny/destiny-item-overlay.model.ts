import {DestinyItemModel} from "./destiny-item.model";
import {DestinyStatNomenclature} from "./nomenclature/destiny-stat.nomenclature";

export class DestinyItemOverlayModel {
  item?: DestinyItemModel;
  statNomenclatures: Map< number, DestinyStatNomenclature> = new Map<number, DestinyStatNomenclature>();
  top!: number;
  left!: number;
}
