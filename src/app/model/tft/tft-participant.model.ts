import {TFTTrait} from "./tft-trait.model";
import {TFTUnit} from "./tft-unit.model";
import {TFTAugment} from "./tft-augment.model";

export class TFTParticipant {
  puuid: string = "";
  augments: TFTAugment[] = [];
  lastRound: number = 0;
  level: number = 0;
  placement: number = 0;
  lifetime: number = 0;
  units: TFTUnit[] = [];
  traits: TFTTrait[] = [];
}
