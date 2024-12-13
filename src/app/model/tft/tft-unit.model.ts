import {TFTItemNomenclature} from "./nomenclature/tft-item.nomenclature";
import {TftUnitNomenclature} from "./nomenclature/tft-unit.nomenclature";

export class TFTUnit {
  rarity!: number;
  tier!: number;
  nomenclature!: TftUnitNomenclature;
  items!: TFTItemNomenclature[];
}
