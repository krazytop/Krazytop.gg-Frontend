import {DestinyObjectiveNomenclature} from "./destiny-objective.nomenclature";

export class DestinyMetricNomenclature {
  hash!: number;
  description!: string;
  name!: string;
  icon!: string;
  trackingObjective!: DestinyObjectiveNomenclature;
  nodeType!: number;
  traitHashes!: number[];
}
