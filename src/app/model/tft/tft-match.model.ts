import {TFTParticipant} from "./tft-participant.model";
import {RIOTMatch} from "../riot/riot-match.model";

export class TFTMatch extends RIOTMatch {
  set!: number;
  participants!: TFTParticipant[];
}
