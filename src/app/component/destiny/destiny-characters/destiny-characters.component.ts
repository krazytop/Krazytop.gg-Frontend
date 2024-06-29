import {Component, Input, OnChanges} from '@angular/core';
import {DestinyCharacterInventoryModel} from "../../../model/destiny/destiny-character-inventory.model";
import {DestinyItemInstanceModel} from "../../../model/destiny/destiny-item-instance.model";
import {DestinyItemNomenclature} from "../../../model/destiny/nomenclature/destiny-item.nomenclature";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {BungieAuthService} from "../bungie-authentification/bungie-auth.service";
import {AlertService} from "../../alert/alert.service";
import {DestinyItemModel} from "../../../model/destiny/destiny-item.model";
import {DestinyInventoryBucketEnum} from "../../../model/destiny/enum/DestinyInventoryBucketsEnum";

@Component({
  selector: 'destiny-characters',
  templateUrl: './destiny-characters.component.html',
  styleUrls: ['./destiny-characters.component.css']
})
export class DestinyCharactersComponent implements OnChanges {

  @Input() isParentComponentReady: boolean = false;
  @Input() profileInventory!: DestinyItemModel[];
  @Input() characterEquipment!: DestinyCharacterInventoryModel[];
  @Input() characterInventories!: DestinyCharacterInventoryModel[];
  @Input() itemInstances!: Map<number, DestinyItemInstanceModel>;
  @Input() itemNomenclatures!: Map<number, DestinyItemNomenclature>;

  constructor(private http: HttpClient, private route: ActivatedRoute, private bungieAuthService: BungieAuthService, private alertService: AlertService) {
  }

  ngOnChanges(): void {
    if (this.isParentComponentReady) {
      this.profileInventory.forEach(item => {
        if (item.bucketHash === DestinyInventoryBucketEnum.General) {
          item.itemNomenclature = this.itemNomenclatures.get(item.itemHash);
          item.itemInstance = this.itemInstances.get(Number(item.itemInstanceId));
        }
      })
    }
  }

  getVaultItems() {
    return this.profileInventory.filter(item =>  {
      if (item.bucketHash === DestinyInventoryBucketEnum.General) {
        item.itemNomenclature = this.itemNomenclatures.get(item.itemHash);
        item.itemInstance = this.itemInstances.get(Number(item.itemInstanceId));
        return item.itemNomenclature != null
      } else {
        return false;
      }
    })!
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

  getItemCategories(){
    return [DestinyInventoryBucketEnum.KineticWeapon, DestinyInventoryBucketEnum.EnergyWeapon, DestinyInventoryBucketEnum.PowerWeapon, DestinyInventoryBucketEnum.Helmet, DestinyInventoryBucketEnum.Gauntlets, DestinyInventoryBucketEnum.ChestArmor, DestinyInventoryBucketEnum.LegArmor, DestinyInventoryBucketEnum.Ship, DestinyInventoryBucketEnum.Emblem]
  }

}
