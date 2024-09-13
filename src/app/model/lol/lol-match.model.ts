import {LOLQueue} from "./lol-queue.model";
import {LOLTeam} from "./lol-team.model";

export class LOLMatch {
  id: string = "";
  version!: string;
  datetime: number = 0;
  length: number = 0;
  queue: LOLQueue = new LOLQueue();
  teams: LOLTeam[] = [];
}
