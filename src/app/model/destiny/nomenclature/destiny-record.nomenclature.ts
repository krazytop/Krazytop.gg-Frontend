import {DestinyObjectiveNomenclature} from "./destiny-objective.nomenclature";
import {DestinyItemQuantityModel} from "../destiny-item-quantity.model";
import {DestinyIntervalObjectiveNomenclature} from "./destiny-interval-objective.nomenclature";

export class DestinyRecordNomenclature {
  hash!: number;
  name!: string;
  description!: string;
  icon!: string;
  recordTypeName!: string;
  expirationDescription: string | undefined;
  hasExpiration!: boolean;
  titlesByGender!: { [key: number]: string };
  objectives?: DestinyObjectiveNomenclature[];
  rewardItems!: DestinyItemQuantityModel[];
  intervalObjectives?: DestinyIntervalObjectiveNomenclature[];
}
