import {DestinyProgressionStepNomenclature} from "./destiny-progression-step.nomenclature";

export class DestinyProgressionNomenclature {
  hash!: number;
  name!: string;
  description!: string;
  icon?: string;
  repeatLastStep!: boolean;
  steps!: DestinyProgressionStepNomenclature[];
}
