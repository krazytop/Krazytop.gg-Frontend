import {DestinyProgressionStepModel} from "../destiny-progression-step.model";

export class DestinyProgressionNomenclature {
  hash!: number;
  name!: string;
  description!: string;
  icon?: string;
  repeatLastStep!: boolean;
  steps!: DestinyProgressionStepModel[];
}
