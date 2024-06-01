import {DestinyObjectiveNomenclature} from "./destiny-objective.nomenclature";
import {DestinyItemQuantityModel} from "../destiny-item-quantity.model";

export class DestinyIntervalObjectiveNomenclature {
  score!: number;
  objective!: DestinyObjectiveNomenclature;
  rewardItems!: DestinyItemQuantityModel[];
}
