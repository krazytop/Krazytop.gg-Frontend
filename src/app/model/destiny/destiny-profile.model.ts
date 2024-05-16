import {DestinyCharacterModel} from "./destiny-character.model";
import {DestinyCharacterInventoryModel} from "./destiny-character-inventory.model";
import {DestinyItemInstanceModel} from "./destiny-item-instance.model";

export class DestinyProfileModel {
  characters: DestinyCharacterModel[] = [];
  characterInventories: DestinyCharacterInventoryModel[] = [];
  itemInstances: DestinyItemInstanceModel[] = [];
}
