import {TFTTrait} from "./tft-trait.model";
import {TFTUnit} from "./tft-unit.model";
import {RIOTSummoner} from "../riot/riot-summoner.model";

export class TFTParticipant {
  summoner!: RIOTSummoner;
  lastRound!: number;
  level!: number;
  goldLeft!: number;
  placement!: number;
  playersEliminated!: number;
  timeEliminated!: number;
  damageToPlayers!: number;
  augments!: string[];
  units!: TFTUnit[];
  traits!: TFTTrait[];
  hasWin!: boolean;
}
