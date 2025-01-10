import {LOLTeam} from "./lol-team.model";
import {RIOTMatch} from "../riot/riot-match.model";

export class LOLMatch extends RIOTMatch {
  teams!: LOLTeam[];
  remake!: boolean
}
