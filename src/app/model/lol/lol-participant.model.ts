import {LOLChampion} from "./lol-champion.model";
import {LOLItem} from "./lol-item.model";
import {RIOTSummoner} from "../riot/riot-summoner.model";
import {LOLSummonerSpell} from "./lol-summoner-spell.model";
import {LOLRunes} from "./lol-runes.model";

export class LOLParticipant {
  champLevel: number = 0;
  champion!: LOLChampion;
  kills: number = 0;
  assists: number = 0;
  deaths: number = 0;
  role: string = "";
  item0?: LOLItem;
  item1?: LOLItem;
  item2?: LOLItem;
  item3?: LOLItem;
  item4?: LOLItem;
  item5?: LOLItem;
  ward?: LOLItem;
  summoner!: RIOTSummoner;
  visionScore: number = 0;
  minions: number = 0;
  doubleKills: number = 0;
  tripleKills: number = 0;
  quadraKills: number = 0;
  pentaKills: number = 0;
  physicalDamageDealtToChampions: number = 0;
  magicDamageDealtToChampions: number = 0;
  trueDamageDealtToChampions: number = 0;
  physicalDamageTaken: number = 0;
  magicDamageTaken: number = 0;
  trueDamageTaken: number = 0;
  summonerSpell1!: LOLSummonerSpell;
  summonerSpell2!: LOLSummonerSpell;
  runes!: LOLRunes;
  golds: number = 0;
}
