import {LOLQueue} from "./lol-queue.model";
import {LOLTeam} from "./lol-team.model";
import {RIOTMatch} from "../riot/riot-match.model";

export class LOLMatch extends RIOTMatch {
  queue!: LOLQueue;
  teams!: LOLTeam[];
  remake!: boolean
}
