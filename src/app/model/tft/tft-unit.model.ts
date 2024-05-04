import {TFTItem} from "./tft-item.model";

export class TFTUnit {
  id: string = "";
  rarity: number = 0;
  tier: number = 0;
  items: TFTItem[] = [];
  name: string = "";
}
