import {Component, Input, OnChanges} from '@angular/core';
import {DestinyCharacterInventoryModel} from "../../../model/destiny/destiny-character-inventory.model";
import {DestinyItemInstanceModel} from "../../../model/destiny/destiny-item-instance.model";
import {DestinyItemNomenclature} from "../../../model/destiny/nomenclature/destiny-item.nomenclature";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {BungieAuthService} from "../bungie-authentification/bungie-auth.service";
import {AlertService} from "../../alert/alert.service";
import {DestinyItemModel} from "../../../model/destiny/destiny-item.model";
import {DestinyInventoryBucketEnum, getAllCharacterBuckets} from "../../../model/destiny/enum/DestinyInventoryBucketsEnum";
import {DestinyCharacterModel} from "../../../model/destiny/destiny-character.model";
import {getClassNameByGender} from "../../../model/destiny/enum/DestinyClassEnum";
import {DestinyErrorResponseModel} from "../../../model/destiny/destiny-error-response.model";
import {throwError} from "rxjs";
import {DestinyDataStorage} from "../DestinyDataStorage";

@Component({
  selector: 'destiny-characters',
  templateUrl: './destiny-characters.component.html',
  styleUrls: ['./destiny-characters.component.css']
})
export class DestinyCharactersComponent implements OnChanges {

  @Input() isParentComponentReady: boolean = false;
  @Input() profileInventory!: DestinyItemModel[];
  @Input() characters!: DestinyCharacterModel[];
  @Input() characterEquipment!: DestinyCharacterInventoryModel[];
  @Input() characterInventories!: DestinyCharacterInventoryModel[];
  @Input() itemInstances!: Map<number, DestinyItemInstanceModel>;
  @Input() itemNomenclatures!: Map<number, DestinyItemNomenclature>;

  private platform?: string;
  readonly vaultInventory: DestinyCharacterInventoryModel = {characterHash: 'vault'} as DestinyCharacterInventoryModel;

  constructor(private http: HttpClient, private route: ActivatedRoute, private bungieAuthService: BungieAuthService, private alertService: AlertService, private destinyDataStorage: DestinyDataStorage) {
  }

  ngOnChanges(): void {
    if (this.isParentComponentReady) {
      this.route.params.subscribe(params => {
        this.platform = params['platform'];
      });
    }
  }

  getCharacterClassName(characterId: string) {
    const character = this.characters.find(character => character.characterId === characterId);
    return getClassNameByGender(character!.classHash, character!.genderHash)
  }

  getEquippedItem(characterHash: string, bucketHash: number) {
    const characterEquipment: DestinyCharacterInventoryModel = this.characterEquipment.find(characterEquipment => characterEquipment.characterHash === characterHash)!;
    return characterEquipment.items.find(item =>  {
      if (item.bucketHash === bucketHash) {
        item.itemNomenclature = this.itemNomenclatures.get(item.itemHash);
        item.itemInstance = this.itemInstances.get(Number(item.itemInstanceId));
        return true
      } else {
        return false;
      }
    })!
  }

  getUnequippedItems(characterHash: string, bucketHash: number) {
    const characterInventory: DestinyCharacterInventoryModel = this.characterInventories.find(characterInventory => characterInventory.characterHash === characterHash)!;
    return characterInventory.items.filter(item =>  {
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
      return this.profileInventory.filter(item => {
        return item.bucketHash === DestinyInventoryBucketEnum.General;
      });
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

  draggedItem?: DestinyItemModel;
  currentDraggedItemInventory: DestinyCharacterInventoryModel | null = null;

  startDraggingItem(item: DestinyItemModel, inventory: DestinyCharacterInventoryModel | null, bucketHash: DestinyInventoryBucketEnum) {
    this.draggedItem = item;
    this.currentDraggedItemInventory = inventory;
    this.characterInventories.forEach(characterInventory => {
      document.getElementById(`character-inventory-${bucketHash}-${characterInventory.characterHash}`)!.classList.add('character-item-category-droppable');
    })
    document.getElementById(`inventory-${bucketHash}-vault`)!.classList.add('character-item-category-droppable');
  }

  dropItem(inventory: DestinyCharacterInventoryModel | null, bucketHash: DestinyInventoryBucketEnum | null) {
    this.characterInventories.forEach(characterInventory => {
      document.getElementById(`character-inventory-${bucketHash}-${characterInventory.characterHash}`)!.classList.remove('character-item-category-droppable');
    })
    document.getElementById(`inventory-${bucketHash}-vault`)!.classList.remove('character-item-category-droppable');
    const vaultToVault = this.currentDraggedItemInventory == null && inventory == null;
    const characterToSameCharacter = this.currentDraggedItemInventory != null && inventory != null && this.currentDraggedItemInventory.characterHash == inventory.characterHash;
    if (!vaultToVault && !characterToSameCharacter) {
      this.moveItem(this.draggedItem!, this.currentDraggedItemInventory, inventory, false, false);
    }
  }

  moveItem(itemToMove: DestinyItemModel, fromInventory: DestinyCharacterInventoryModel | null, toInventory: DestinyCharacterInventoryModel | null, isEquipped: boolean, toBeEquipped: boolean) {
    document.getElementById(`item-${itemToMove.itemInstanceId}`)?.classList.add('item-being-transferred')
    if (isEquipped) {
      this.equipItemApi(itemToMove, fromInventory!)
        .subscribe({
          next: () => {
            //TODO move item
            this.moveItem(itemToMove, fromInventory, toInventory, false, toBeEquipped);
          },
          error: (error: HttpErrorResponse) => this.handleAPIError(error, itemToMove)
      });
    } else if (fromInventory != null) {
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
            //TODO move item
          },
          error: (error: HttpErrorResponse) => this.handleAPIError(error, itemToMove)
        });
    }
  }

  private manuallyMoveItemToVault(itemToMove: DestinyItemModel, fromInventory: DestinyCharacterInventoryModel) {
    itemToMove.bucketHash = DestinyInventoryBucketEnum.General;
    const characterInventory = this.destinyDataStorage.profile.characterInventories.find(characterInventory =>
      characterInventory.characterHash === fromInventory!.characterHash
    )!;
    characterInventory.items = characterInventory.items.filter(item => item.itemHash != itemToMove.itemHash);
    this.destinyDataStorage.profile.profileInventory.push(itemToMove);
  }

  private manuallyMoveItemToCharacter(itemToMove: DestinyItemModel, toInventory: DestinyCharacterInventoryModel) {
    itemToMove.bucketHash = itemToMove.itemNomenclature!.bucketTypeHash;
    this.destinyDataStorage.profile.profileInventory = this.destinyDataStorage.profile.profileInventory.filter(item => item.itemHash != itemToMove.itemHash);
    this.destinyDataStorage.profile.characterInventories.find(characterInventory =>
      characterInventory.characterHash === toInventory!.characterHash
    )!.items.push(itemToMove);
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

  private transferItemApi(itemToMove: DestinyItemModel, fromCharacterInventory: DestinyCharacterInventoryModel, toCharacterInventory: DestinyCharacterInventoryModel) {
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

  private equipItemApi(itemToMove: DestinyItemModel, characterInventory: DestinyCharacterInventoryModel) {
    const body = {
      "itemId": itemToMove.itemInstanceId,
      "characterId": characterInventory.characterHash,
      "membershipType": this.platform
    };
    return this.http.post(`https://www.bungie.net/Platform/Destiny2/Actions/Items/EquipItem/`, body, {headers: this.bungieAuthService.getHeaders()});
  }

  protected readonly getAllCharacterBuckets = getAllCharacterBuckets;
}
