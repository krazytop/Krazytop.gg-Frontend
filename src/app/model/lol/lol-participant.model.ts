import {RIOTSummoner} from "../riot/riot-summoner.model";
import {LOLRunes} from "./lol-runes.model";

export class LOLParticipant {
  champLevel!: number
  champion!: string;
  kills!: number;
  assists!: number;
  deaths!: number;
  role!: string;
  item0?: string;
  item1?: string;
  item2?: string;
  item3?: string;
  item4?: string;
  item5?: string;
  ward?: string;
  summoner!: RIOTSummoner;
  visionScore!: number;
  neutralMinions!: number;
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
  summonerSpell1!: string;
  summonerSpell2!: string;
  runes!: LOLRunes;
  golds!: number;
  augment1?: string;
  augment2?: string;
  augment3?: string;
  augment4?: string;
  augment5?: string;
  augment6?: string;
  gameEndedInEarlySurrender!: boolean;
}
