import {DestinyProgressionNomenclature} from "./destiny-progression.nomenclature";

export class DestinyVendorProgressionModel {
  currentProgress!: number;
  currentResetCount!: number;
  level!: number;
  levelCap!: number;
  nextLevelAt!: number;
  progressToNextLevel!: number;
  stepIndex!: number;
  progressionHash!: number;
  progressionNomenclature?: DestinyProgressionNomenclature;
}
