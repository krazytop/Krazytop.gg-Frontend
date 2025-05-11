import {DestinyItemModel} from "./destiny-item.model";
import {DestinyStatNomenclature} from "./nomenclature/destiny-stat.nomenclature";
import {DestinyObjectiveNomenclature} from "./nomenclature/destiny-objective.nomenclature";

export class DestinyItemOverlayModel {
  item?: DestinyItemModel;
  statNomenclatures: Map<number, DestinyStatNomenclature> = new Map();
  objectiveNomenclatures: Map<number, DestinyObjectiveNomenclature> = new Map();
  top!: number;
  left!: number;
}
