import {LOLObjectives} from "./lol-objectives.model";
import {LOLParticipant} from "./lol-participant.model";

export class LOLTeam {
  hasWin!: boolean;
  objectives!: LOLObjectives;
  bans!: string[];
  participants!: LOLParticipant[];
  id!: string;
  placement?: number;
}
