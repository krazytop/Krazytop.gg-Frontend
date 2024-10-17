import {Component, Input, OnChanges} from '@angular/core';
import {DestinyCharacterInventoryModel} from "../../../model/destiny/destiny-character-inventory.model";
import {DestinyItemInstanceModel} from "../../../model/destiny/destiny-item-instance.model";
import {DestinyItemNomenclature} from "../../../model/destiny/nomenclature/destiny-item.nomenclature";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {BungieAuthService} from "../bungie-authentification/bungie-auth.service";
import {AlertService} from "../../alert/alert.service";
import {DestinyItemModel} from "../../../model/destiny/destiny-item.model";
import {
  DestinyInventoryBucketEnum,
  getAllCharacterBuckets, isArmor,
  isWeapon
} from "../../../model/destiny/enum/DestinyInventoryBucketsEnum";
import {DestinyCharacterModel} from "../../../model/destiny/destiny-character.model";
import {getClassNameByGender} from "../../../model/destiny/enum/DestinyClassEnum";
import {DestinyErrorResponseModel} from "../../../model/destiny/destiny-error-response.model";
import {throwError} from "rxjs";
import {DestinyTierTypeEnum} from "../../../model/destiny/enum/DestinyTierTypeEnum";
import {DestinyItemStateEnum} from "../../../model/destiny/enum/DestinyItemStateEnum";
import {DestinyNodeProgressionModel} from "../../../model/destiny/destiny-node-progression.model";
import {DestinyPresentationTreeNomenclature} from "../../../model/destiny/destiny-presentation-tree.model";
import { DestinyRecordNomenclature } from 'src/app/model/destiny/nomenclature/destiny-record.nomenclature';

@Component({
  selector: 'destiny-characters',
  templateUrl: './destiny-characters.component.html',
  styleUrls: ['./destiny-characters.component.css']
})
export class DestinyCharactersComponent implements OnChanges {

  @Input() profileInventory!: DestinyItemModel[];
  @Input() characters!: DestinyCharacterModel[];
  @Input() characterEquipment!: DestinyCharacterInventoryModel[];
  @Input() characterInventories!: DestinyCharacterInventoryModel[];
  @Input() itemInstances!: Map<number, DestinyItemInstanceModel>;
  @Input() itemNomenclatures!: Map<number, DestinyItemNomenclature>;
  @Input() presentationNodeProgress!: Map<number, DestinyNodeProgressionModel>;
  @Input() kineticWeaponModelsPresentationTree!: DestinyPresentationTreeNomenclature;
  @Input() energyWeaponModelsPresentationTree!: DestinyPresentationTreeNomenclature;
  @Input() powerWeaponModelsPresentationTree!: DestinyPresentationTreeNomenclature;

  private platform?: string;
  readonly vaultInventory: DestinyCharacterInventoryModel = {characterHash: 'vault'} as DestinyCharacterInventoryModel;
  allItems: DestinyItemModel[] = [];
  allCraftedWeaponRecords: DestinyRecordNomenclature[] = [];
  highlightDuplicateItems = false;
  highlightExoticItems = false;
  highlightUnlockedItems = false;
  highlightNotCraftedItems = false;

  constructor(private http: HttpClient, private route: ActivatedRoute, private bungieAuthService: BungieAuthService, private alertService: AlertService) {
  }

  ngOnChanges(): void {
    this.route.params.subscribe(params => {
      this.platform = params['platform'];
      this.allItems = this.characterInventories.flatMap(inventory => inventory.items)
        .concat(this.characterEquipment.flatMap(equipment => equipment.items))
        .concat(this.profileInventory.filter(item => item.bucketHash === DestinyInventoryBucketEnum.General));
      const kineticWeaponRecords = this.kineticWeaponModelsPresentationTree.childrenNode.flatMap(weaponCategory => weaponCategory.childrenRecord);
      const energyWeaponRecords = this.energyWeaponModelsPresentationTree.childrenNode.flatMap(weaponCategory => weaponCategory.childrenRecord);
      const powerWeaponRecords = this.powerWeaponModelsPresentationTree.childrenNode.flatMap(weaponCategory => weaponCategory.childrenRecord);
      this.allCraftedWeaponRecords = [...kineticWeaponRecords, ...energyWeaponRecords, ...powerWeaponRecords];
      console.log(this.allCraftedWeaponRecords[0])//TODO comparer à l image pour savoir si une arme à son modele craftable
      console.log(this.allItems.filter(item => item.itemHash))
    });
  }

  getCharacterClassName(characterId: string) {
    const character = this.characters.find(character => character.characterId === characterId);
    return getClassNameByGender(character!.classHash, character!.genderHash)
  }

  getEquippedItem(characterHash: string, bucketHash: number) {
    const characterEquipment: DestinyCharacterInventoryModel = this.characterEquipment.find(characterEquipment => characterEquipment.characterHash === characterHash)!;
    return this.getItemsByBucket(characterEquipment, bucketHash)[0];
  }

  getUnequippedItems(characterHash: string, bucketHash: number) {
    const characterInventory: DestinyCharacterInventoryModel = this.characterInventories.find(characterInventory => characterInventory.characterHash === characterHash)!;
    return this.getItemsByBucket(characterInventory, bucketHash);
  }

  private getItemsByBucket(inventory: DestinyCharacterInventoryModel, bucketHash: number) {
    return inventory.items.filter(item =>  {
      if (item.bucketHash === bucketHash) {
        item.itemNomenclature = this.itemNomenclatures.get(item.itemHash);
        item.itemInstance = this.itemInstances.get(Number(item.itemInstanceId));
        return true
      } else {
        return false;
      }
    })
  }

  getVaultItems(bucketHash: number | null) {
    if (bucketHash == null) {
      return this.profileInventory.filter(item => item.bucketHash === DestinyInventoryBucketEnum.General);
    } else {
      return this.profileInventory.filter(item =>  {
        if (item.bucketHash === DestinyInventoryBucketEnum.General) {
          item.itemNomenclature = this.itemNomenclatures.get(item.itemHash);
          if (item.itemNomenclature?.bucketTypeHash === bucketHash) {
            item.itemInstance = this.itemInstances.get(Number(item.itemInstanceId));
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      })!
    }
  }

  shouldItemBeDisplayed(item: DestinyItemModel) {
    let shouldBeDisplayed = true;
    if (this.highlightDuplicateItems) {
      shouldBeDisplayed = shouldBeDisplayed && this.allItems.filter(i => i.itemHash === item.itemHash).length > 1;
    }
    if (this.highlightExoticItems) {
      shouldBeDisplayed = shouldBeDisplayed && item.itemNomenclature?.tierTypeHash === DestinyTierTypeEnum.Exotic;
    }
    if (this.highlightUnlockedItems) {
      shouldBeDisplayed = shouldBeDisplayed && (item.state & (1 << Math.log2(DestinyItemStateEnum.Locked))) === 0;
    }
    if (this.highlightNotCraftedItems) {
      //TODO check si un model est dispo
      shouldBeDisplayed = shouldBeDisplayed && (item.state & (1 << Math.log2(DestinyItemStateEnum.Crafted))) === 0;
    }
    return shouldBeDisplayed;
  }

  currentDraggedItem: {
    item?: DestinyItemModel;
    isEquipped?: boolean;
    inventory?: DestinyCharacterInventoryModel;
  } = {};

  startDraggingItem(item: DestinyItemModel, inventory: DestinyCharacterInventoryModel, bucketHash: DestinyInventoryBucketEnum, isEquipped: boolean) {
    this.currentDraggedItem = {
      item: item,
      isEquipped: isEquipped,
      inventory: inventory
    }
    this.characterInventories.forEach(characterInventory => {
      document.getElementById(`character-inventory-${bucketHash}-${characterInventory.characterHash}`)!.classList.add('character-item-category-droppable');
    })
    document.getElementById(`inventory-${bucketHash}-vault`)!.classList.add('character-item-category-droppable');
  }

  async dropItem(inventory: DestinyCharacterInventoryModel | null, bucketHash: DestinyInventoryBucketEnum | null, toBeEquipped: boolean) { //TODO async in html
    this.characterInventories.forEach(characterInventory => {
      document.getElementById(`character-inventory-${bucketHash}-${characterInventory.characterHash}`)!.classList.remove('character-item-category-droppable');
    })
    document.getElementById(`inventory-${bucketHash}-vault`)!.classList.remove('character-item-category-droppable');
    const vaultToVault = this.currentDraggedItem.inventory == null && inventory == null;
    const equipOrUnEquip = this.currentDraggedItem.isEquipped !== toBeEquipped;
    const characterToSameCharacter = !equipOrUnEquip && (this.currentDraggedItem.inventory != null && inventory != null && this.currentDraggedItem.inventory.characterHash == inventory.characterHash);
    if (!vaultToVault && !characterToSameCharacter) {
      await this.moveItem(this.currentDraggedItem.item!, this.currentDraggedItem.inventory!, inventory, this.currentDraggedItem.isEquipped!, toBeEquipped);
    }
  }

  async moveItem(itemToMove: DestinyItemModel, fromInventory: DestinyCharacterInventoryModel | null, toInventory: DestinyCharacterInventoryModel | null, isEquipped: boolean, toBeEquipped: boolean) {
    if (await this.bungieAuthService.checkTokenValidity()) {
      document.getElementById(`item-${itemToMove.itemInstanceId}`)?.classList.add('item-being-transferred')
      if (isEquipped) {
        this.equipItemApi(itemToMove, fromInventory!)
          .subscribe({
            next: () => {
              this.equipAnOtherItem(itemToMove, fromInventory!);
              setTimeout(() => this.moveItem(itemToMove, fromInventory, toInventory, false, toBeEquipped), 5000);
            },
            error: (error: HttpErrorResponse) => this.handleAPIError(error, itemToMove)
          });
      } else if (fromInventory != null && fromInventory != toInventory) {
        if (fromInventory != this.vaultInventory && toInventory != this.vaultInventory) {
          this.transferItemApi(itemToMove, fromInventory, this.vaultInventory)
            .subscribe({
              next: () => {
                this.manuallyMoveItemToVault(itemToMove, fromInventory);
                this.moveItem(itemToMove, this.vaultInventory, toInventory, false, toBeEquipped);
              },
              error: (error: HttpErrorResponse) => this.handleAPIError(error, itemToMove)
            });
        } else {
          this.transferItemApi(itemToMove, fromInventory, toInventory!)
            .subscribe({
              next: () => {
                if (fromInventory == this.vaultInventory) {
                  this.manuallyMoveItemToCharacter(itemToMove, toInventory!);
                } else {
                  this.manuallyMoveItemToVault(itemToMove, fromInventory);
                }
                this.moveItem(itemToMove, null, toInventory, false, toBeEquipped);
              },
              error: (error: HttpErrorResponse) => this.handleAPIError(error, itemToMove)
            });
        }
      } else if (toBeEquipped) {
        this.equipItemApi(itemToMove, toInventory!)
          .subscribe({
            next: () => {
              this.manuallyEquipItem(itemToMove, toInventory!);
            },
            error: (error: HttpErrorResponse) => this.handleAPIError(error, itemToMove)
          });
      }
    } else {
      this.bungieAuthService.disconnectWithError("You need to reconnect your bungie account");
    }
  }

  private manuallyMoveItemToVault(itemToMove: DestinyItemModel, fromInventory: DestinyCharacterInventoryModel) {
    itemToMove.bucketHash = DestinyInventoryBucketEnum.General;
    const characterInventory = this.characterInventories.find(characterInventory =>
      characterInventory.characterHash === fromInventory!.characterHash
    )!;
    characterInventory.items = characterInventory.items.filter(item => item.itemHash != itemToMove.itemHash);
    this.profileInventory.push(itemToMove);
  }

  private manuallyMoveItemToCharacter(itemToMove: DestinyItemModel, toInventory: DestinyCharacterInventoryModel) {
    itemToMove.bucketHash = itemToMove.itemNomenclature!.bucketTypeHash;
    this.profileInventory = this.profileInventory.filter(item => item.itemHash != itemToMove.itemHash);
    this.characterInventories.find(characterInventory =>
      characterInventory.characterHash === toInventory!.characterHash
    )!.items.push(itemToMove);
  }

  private manuallyEquipItem(itemToMove: DestinyItemModel, inventory: DestinyCharacterInventoryModel) {
    const currentEquippedItem = this.getEquippedItem(inventory.characterHash, itemToMove.itemNomenclature!.bucketTypeHash);
    const unequippedInventory = this.characterInventories.find(characterInventory =>
      characterInventory.characterHash === inventory.characterHash
    )!;
    unequippedInventory.items = unequippedInventory.items.filter(item => item.itemHash != itemToMove.itemHash);
    unequippedInventory.items.push(currentEquippedItem);
    const equippedInventory = this.characterEquipment.find(characterInventory =>
      characterInventory.characterHash === inventory.characterHash
    )!;
    equippedInventory.items = equippedInventory.items.filter(item => item.itemHash != currentEquippedItem.itemHash);
    equippedInventory.items.push(itemToMove);
  }

  private equipAnOtherItem(itemToMove: DestinyItemModel, inventory: DestinyCharacterInventoryModel) {
    let anExoticIsAlreadyEquipped = false;
    let bucketsToCheck: DestinyInventoryBucketEnum[] = [];
    if (isWeapon(itemToMove)) {
      bucketsToCheck = [DestinyInventoryBucketEnum.KineticWeapon, DestinyInventoryBucketEnum.EnergyWeapon, DestinyInventoryBucketEnum.PowerWeapon]
    } else if (isArmor(itemToMove)) {
      bucketsToCheck = [DestinyInventoryBucketEnum.Helmet, DestinyInventoryBucketEnum.Gauntlets, DestinyInventoryBucketEnum.ChestArmor, DestinyInventoryBucketEnum.LegArmor, DestinyInventoryBucketEnum.ClassObject]
    }
    bucketsToCheck = bucketsToCheck.filter(bucket => bucket != itemToMove.bucketHash);
    for (let bucket of bucketsToCheck) {
      if (this.characterEquipment.find(characterEquipment => characterEquipment.characterHash == inventory.characterHash)!.items.find(item => item.bucketHash == bucket)?.itemNomenclature!.tierTypeHash == DestinyTierTypeEnum.Exotic) {
        anExoticIsAlreadyEquipped = true;
      }
    }
    let items = inventory.items.filter(item =>
      item.itemHash != itemToMove.itemHash
      && item.itemNomenclature?.bucketTypeHash == itemToMove.itemNomenclature?.bucketTypeHash
    )
    if (anExoticIsAlreadyEquipped) {
      items = items.filter(item => item.itemNomenclature?.tierTypeHash != DestinyTierTypeEnum.Exotic)
    }
    if (items.length > 0) {
      this.moveItem(items[0], null, inventory, false, true);
    } else {
      items = this.profileInventory.filter(item =>
        item.itemHash != itemToMove.itemHash
        && item.bucketHash == DestinyInventoryBucketEnum.General
        && item.itemNomenclature?.bucketTypeHash == itemToMove.itemNomenclature?.bucketTypeHash
      )
      if (anExoticIsAlreadyEquipped) {
        items = items.filter(item => item.itemNomenclature?.tierTypeHash != DestinyTierTypeEnum.Exotic)
      }
      if (items.length > 0) {
        this.moveItem(items[0], this.vaultInventory, inventory, false, true);
      }
    }
  }

  private handleAPIError(error: HttpErrorResponse, itemToMove: DestinyItemModel) {
    document.getElementById(`item-${itemToMove.itemInstanceId}`)!.classList.remove('item-being-transferred')
    const destinyErrorResponse: DestinyErrorResponseModel = error.error as DestinyErrorResponseModel;
    this.alertService.processAlert({
      message: destinyErrorResponse.Message,
      duration: 3000
    });
    return throwError(() => error);
  }

  private transferItemApi(itemToMove: DestinyItemModel, fromCharacterInventory: DestinyCharacterInventoryModel, toCharacterInventory: DestinyCharacterInventoryModel) { //TODO verifier token
    const body = {
      "itemReferenceHash": itemToMove.itemHash,
      "stackSize": 1,
      "itemId": itemToMove.itemInstanceId,
      "characterId": fromCharacterInventory.characterHash != 'vault' ? fromCharacterInventory.characterHash : toCharacterInventory!.characterHash,
      "transferToVault": fromCharacterInventory.characterHash != 'vault',
      "membershipType": this.platform
    };
    return this.http.post(`https://www.bungie.net/Platform/Destiny2/Actions/Items/TransferItem/`, body, {headers: this.bungieAuthService.getHeaders()});
  }

  private equipItemApi(itemToMove: DestinyItemModel, characterInventory: DestinyCharacterInventoryModel) { //TODO verifier token
    const body = {
      "itemId": itemToMove.itemInstanceId,
      "characterId": characterInventory.characterHash,
      "membershipType": this.platform
    };
    return this.http.post(`https://www.bungie.net/Platform/Destiny2/Actions/Items/EquipItem/`, body, {headers: this.bungieAuthService.getHeaders()});
  }

  protected readonly getAllCharacterBuckets = getAllCharacterBuckets;
}
