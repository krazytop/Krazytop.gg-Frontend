import {DestinyObjectiveNomenclature} from "./nomenclature/destiny-objective.nomenclature";
import {DestinyItemQuantityModel} from "./destiny-item-quantity.model";

export class DestinyIntervalObjectiveModel {
  score!: number;
  objective!: DestinyObjectiveNomenclature;
  rewardItems!: DestinyItemQuantityModel[];
}
