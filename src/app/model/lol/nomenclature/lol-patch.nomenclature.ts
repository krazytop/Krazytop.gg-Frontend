import {LOLItemNomenclature} from "./lol-item.nomenclature";
import {LOLSummonerSpellNomenclature} from "./lol-summoner-spell.nomenclature";
import {LOLRuneNomenclature} from "./lol-rune.nomenclature";
import {RIOTQueueNomenclature} from "../../riot/nomenclature/riot-queue.nomenclature";
import {LOLChampionNomenclature} from "./lol-champion.nomenclature";
import {LOLAugmentNomenclature} from "./lol-augment.nomenclature";

export class LOLPatchNomenclature {
  id!: string;
  patchId!: string;
  language!: string;
  season!: number;
  champions!: LOLChampionNomenclature[];
  items!: LOLItemNomenclature[];
  summonerSpells!: LOLSummonerSpellNomenclature[];
  augments!: LOLAugmentNomenclature[];
  runes!: LOLRuneNomenclature[];
  queues!: RIOTQueueNomenclature[];
}
