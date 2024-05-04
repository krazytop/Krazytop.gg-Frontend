import {DestinyClassNomenclature} from "./destiny-class.nomenclature";

export class DestinyCharacterModel {
  light!: number;
  characterId!: string;
  classHash!: number;
  classNomenclature?: DestinyClassNomenclature;
  genderHash!: number;
  emblemBackgroundPath!: string;
  titleRecordHash!: string;
  dateLastPlayed!: string;
}
