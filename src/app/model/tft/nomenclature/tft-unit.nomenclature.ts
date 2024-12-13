import {TFTAbilityNomenclature} from "./tft-ability.nomenclature";

export class TftUnitNomenclature {
  id!: string;
  name!: string;
  image!: string;
  cost!: number;
  traits!: string[];
  ability!: TFTAbilityNomenclature;
}
