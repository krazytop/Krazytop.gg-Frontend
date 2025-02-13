import {LOLNomenclature} from "./lol.nomenclature";

export class LOLChampionNomenclature extends LOLNomenclature {
  stats!: Map<string, number>;
  tags!: {[key: string]: number};
}
