import {DestinyCharacterModel} from "./destiny-character.model";
import {DestinyCharacterInventoryModel} from "./destiny-character-inventory.model";
import {DestinyItemInstanceModel} from "./destiny-item-instance.model";
import {DestinyItemModel} from "./destiny-item.model";
import {DestinyNodeProgressionModel} from "./destiny-node-progression.model";
import {DestinyLinkedProfilesModel} from "./destiny-linked-profiles.model";
import {DestinyCollectibleModel} from "./destiny-collectible.model";
import {DestinyItemStatModel} from "./destiny-item-stat.model";
import {DestinyPlugModel} from "./destiny-plug.model";
import {DestinySocketModel} from "./destiny-socket.model";
import {DestinyObjectiveProgressModel} from "./destiny-objective-progress.model";

export class DestinyProfileModel {//TODO map les characters
  linkedProfiles: DestinyLinkedProfilesModel[] = [];
  characters: DestinyCharacterModel[] = [];
  characterInventories: DestinyCharacterInventoryModel[] = [];
  profileInventory: DestinyItemModel[] = [];
  characterEquipment: DestinyCharacterInventoryModel[] = [];
  characterCollectibles: Map<string, Map<number, DestinyCollectibleModel>> = new Map();
  profileCollectibles: Map<number, DestinyCollectibleModel> = new Map();
  itemInstances: Map<string, DestinyItemInstanceModel> = new Map();
  itemObjectives: Map<string, DestinyObjectiveProgressModel[]> = new Map();
  itemStats: Map<string, DestinyItemStatModel[]> = new Map();
  itemSockets: Map<string, DestinySocketModel[]> = new Map();
  itemPlugs: Map<string, Map<number, DestinyPlugModel[]>> = new Map();
  presentationNodeProgress: Map<number, DestinyNodeProgressionModel> = new Map();
  profileCurrencies: DestinyItemModel[] = [];
}
