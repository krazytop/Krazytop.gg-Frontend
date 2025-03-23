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

export class DestinyProfileModel {//TODO map les characters
  linkedProfiles: DestinyLinkedProfilesModel[] = [];
  characters: DestinyCharacterModel[] = [];
  characterInventories: DestinyCharacterInventoryModel[] = [];
  profileInventory: DestinyItemModel[] = [];
  characterEquipment: DestinyCharacterInventoryModel[] = [];
  characterCollectibles: Map<number, Map<number, DestinyCollectibleModel>> = new Map();
  profileCollectibles: Map<number, DestinyCollectibleModel> = new Map();
  itemInstances: Map<number, DestinyItemInstanceModel> = new Map();
  itemStats: Map<number, DestinyItemStatModel[]> = new Map();
  itemSockets: Map<number, DestinySocketModel[]> = new Map();
  itemPlugs: Map<number, Map<number, DestinyPlugModel[]>> = new Map();
  presentationNodeProgress: Map<number, DestinyNodeProgressionModel> = new Map();
  profileCurrencies: DestinyItemModel[] = [];
}
