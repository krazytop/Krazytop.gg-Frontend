import {Component, Input, OnChanges} from '@angular/core';
import {DestinyItemModel} from "../../../model/destiny/destiny-item.model";
import {DestinyItemNomenclature} from "../../../model/destiny/nomenclature/destiny-item.nomenclature";
import {DestinyComponent} from "../destiny.component";
import {Engrams, MainCurrencies} from "../../../model/destiny/enum/MainInventoryEnum";

@Component({
  selector: 'destiny-main-inventory',
  templateUrl: './destiny-main-inventory.component.html',
  styleUrls: ['./destiny-main-inventory.component.css']
})
export class DestinyMainInventoryComponent implements OnChanges {

  @Input() profileInventory!: DestinyItemModel[];
  @Input() profileCurrencies!: DestinyItemModel[];
  @Input() itemNomenclatures!: Map<number, DestinyItemNomenclature>;
  @Input() isParentComponentReady: boolean = false;

  mainCurrencies: DestinyItemModel[] = [];
  engrams: DestinyItemModel[] = [];

  ngOnChanges(): void {
    if (this.isParentComponentReady) {
      this.mainCurrencies = [];
      this.engrams = [];
      MainCurrencies.forEach(itemHash => {
        this.mainCurrencies.push(this.findItem(itemHash));
      })
      Engrams.forEach(itemHash => {
        this.engrams.push(this.findItem(itemHash));
      })
    }
  }

  findItem(itemHash: number){
    let item: DestinyItemModel = new DestinyItemModel();
    item.itemHash = itemHash;
    item.itemNomenclature = this.itemNomenclatures.get(itemHash);
    item.quantity = this.profileInventory.find(item => item.itemHash === itemHash)?.quantity ??
      this.profileCurrencies.find(item => item.itemHash === itemHash)?.quantity ?? 0
    return item;
  }

  protected readonly DestinyComponent = DestinyComponent;
}
