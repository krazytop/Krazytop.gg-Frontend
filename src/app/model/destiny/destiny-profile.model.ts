import {DestinyCharacterModel} from "./destiny-character.model";
import {DestinyCharacterInventoryModel} from "./destiny-character-inventory.model";
import {DestinyItemInstanceModel} from "./destiny-item-instance.model";
import {DestinyItemModel} from "./destiny-item.model";
import {DestinyObjectiveProgressModel} from "./destiny-objective-progress.model";
import {DestinyPresentationTreeNomenclature} from "./destiny-presentation-tree.model";
import {DestinyNodeProgressionModel} from "./destiny-node-progression.model";
import {DestinyLinkedProfilesModel} from "./destiny-linked-profiles.model";

export class DestinyProfileModel {
  linkedProfiles: DestinyLinkedProfilesModel[] = [];
  characters: DestinyCharacterModel[] = [];
  characterInventories: DestinyCharacterInventoryModel[] = [];
  characterEquipment: DestinyCharacterInventoryModel[] = [];
  itemInstances: Map<number, DestinyItemInstanceModel> = new Map();
  presentationNodeProgress: Map<number, DestinyNodeProgressionModel> = new Map();
  profileCurrencies: DestinyItemModel[] = [];
  profileInventory: DestinyItemModel[] = [];
}
