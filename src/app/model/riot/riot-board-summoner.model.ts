import {RIOTMatch} from "./riot-match.model";
import {RIOTSummoner} from "./riot-summoner.model";
import {RIOTRank} from "./riot-rank.model";
import {LOLMastery} from "../lol/lol-mastery.model";

export class RIOTBoardSummoner {
  matches!: RIOTMatch[];
  matchesStreak!: number;
  matchesResults!: string[];
  mainRoles!: number[][];
  maxPlayedRole!: number;
  summoner!: RIOTSummoner;
  ranks?: RIOTRank;
  masteries: LOLMastery[] = [];
  isImporting: boolean = false;
}
