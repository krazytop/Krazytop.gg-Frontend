import {TFTTrait} from "./tft-trait.model";
import {TFTUnit} from "./tft-unit.model";
import {RIOTSummoner} from "../riot/riot-summoner.model";
import {TFTItemNomenclature} from "./nomenclature/tft-item.nomenclature";

export class TFTParticipant {
  summoner!: RIOTSummoner;
  lastRound!: number;
  level!: number;
  goldLeft!: number;
  placement!: number;
  playersEliminated!: number;
  timeEliminated!: number;
  damageToPlayers!: number;
  teamId!: number;
  hasWin!: boolean;
  augments: TFTItemNomenclature[] = [];
  units!: TFTUnit[];
  traits!: TFTTrait[];
}
