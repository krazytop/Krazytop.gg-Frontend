import {LOLNomenclature} from "./lol.nomenclature";

export class LOLItemNomenclature extends LOLNomenclature {
  plainText!: string;
  baseGold!: number;
  totalGold!: number;
  tags!: string[];
  stats!: {[key: string]: number};
  toItems!: string[];
  fromItems!: string[];
}
