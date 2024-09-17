import {LOLChampion} from "./lol-champion.model";
import {LOLItem} from "./lol-item.model";
import {RIOTSummoner} from "../riot/riot-summoner.model";
import {LOLSummonerSpell} from "./lol-summoner-spell.model";
import {LOLRunes} from "./lol-runes.model";

export class LOLParticipant {
  champLevel!: number
  champion!: LOLChampion;
  kills!: number;
  assists!: number;
  deaths!: number;
  role!: string;
  item0?: LOLItem;
  item1?: LOLItem;
  item2?: LOLItem;
  item3?: LOLItem;
  item4?: LOLItem;
  item5?: LOLItem;
  ward?: LOLItem;
  summoner!: RIOTSummoner;
  visionScore!: number;
  minions!: number;
  doubleKills!: number;
  tripleKills!: number;
  quadraKills!: number;
  pentaKills!: number;
  physicalDamageDealtToChampions!: number;
  magicDamageDealtToChampions!: number;
  trueDamageDealtToChampions!: number;
  physicalDamageTaken!: number;
  magicDamageTaken!: number;
  trueDamageTaken!: number;
  summonerSpell1!: LOLSummonerSpell;
  summonerSpell2!: LOLSummonerSpell;
  runes!: LOLRunes;
  golds!: number;
}
