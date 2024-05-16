import {DestinyObjectiveNomenclature} from "./destiny-objective.nomenclature";
import {DestinyItemQuantityModel} from "../destiny-item-quantity.model";
import {DestinyIntervalObjectiveModel} from "../destiny-interval-objective.model";

export class DestinyRecordNomenclature {
  hash!: number;
  name!: string;
  description!: string;
  icon!: string;
  recordTypeName!: string;
  expirationDescription: string | undefined;
  hasExpiration!: boolean;
  titlesByGender: { [key: number]: string } | undefined;
  objectives!: DestinyObjectiveNomenclature[];
  rewardItems!: DestinyItemQuantityModel[];
  intervalObjectives!: DestinyIntervalObjectiveModel[];
}
