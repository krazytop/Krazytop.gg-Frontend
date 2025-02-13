import {LOLNomenclature} from "./lol.nomenclature";

export class LOLRuneNomenclature extends LOLNomenclature {
  perks!: LOLRunePerkNomenclature[][];
}

export class LOLRunePerkNomenclature extends LOLNomenclature {
  longDescription!: string;
}

