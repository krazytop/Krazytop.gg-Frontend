import {DestinyObjectiveNomenclature} from "./nomenclature/destiny-objective.nomenclature";
import {DestinyItemNomenclature} from "./nomenclature/destiny-item.nomenclature";
import {DestinyMetricNomenclature} from "./nomenclature/destiny-metric.nomenclature";
import {DestinyRecordNomenclature} from "./nomenclature/destiny-record.nomenclature";
import {DestinyCollectibleNomenclature} from "./nomenclature/destiny-collectible.nomenclature";

export class DestinyPresentationTreeModel {
  hash!: number;
  name!: string;
  description!: string;
  icon?: string;
  nodeType!: number;
  isSeasonal!: boolean;
  objective!: DestinyObjectiveNomenclature;
  childrenNode!: DestinyPresentationTreeModel[];
  childrenCollectible!: DestinyCollectibleNomenclature[];
  childrenRecord!: DestinyRecordNomenclature[];
  childrenMetric!: DestinyMetricNomenclature[];
  childrenCraftable!: number[];
}
