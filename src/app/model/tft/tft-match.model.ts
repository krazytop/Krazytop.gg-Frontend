import {TFTParticipant} from "./tft-participant.model";
import {TFTQueue} from "./tft-queue.model";

export class TFTMatch {
  id: string = "";
  datetime: number = 0;
  length: number = 0;
  gameType: string = "";
  queue: TFTQueue = new TFTQueue();
  set: string = "";
  participants: TFTParticipant[] = [];
}
