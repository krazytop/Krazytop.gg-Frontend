import {DestinyObjectiveNomenclature} from "./destiny-objective.nomenclature";
import {DestinyItemNomenclature} from "./destiny-item.nomenclature";
import {DestinyMetricNomenclature} from "./destiny-metric.nomenclature";
import {DestinyRecordNomenclature} from "./destiny-record.nomenclature";
import {DestinyCollectibleNomenclature} from "./destiny-collectible.nomenclature";

export class DestinyPresentationTreeNomenclature {
  hash!: number;
  name!: string;
  description!: string;
  icon!: string;
  nodeType!: number;
  isSeasonal!: boolean;
  objective!: DestinyObjectiveNomenclature[];
  childrenNode!: DestinyPresentationTreeNomenclature[];
  childrenCollectible!: DestinyCollectibleNomenclature[];
  childrenRecord!: DestinyRecordNomenclature[];
  childrenMetric!: DestinyMetricNomenclature[];
  childrenCraftable!: DestinyItemNomenclature[];
}
