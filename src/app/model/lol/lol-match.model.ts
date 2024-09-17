import {LOLQueue} from "./lol-queue.model";
import {LOLTeam} from "./lol-team.model";

export class LOLMatch {
  id!: string;
  version!: string;
  datetime!: number;
  length!: number;
  queue!: LOLQueue;
  teams!: LOLTeam[];
}
