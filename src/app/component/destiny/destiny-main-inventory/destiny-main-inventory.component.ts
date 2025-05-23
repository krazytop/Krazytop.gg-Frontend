import {Component, Input, OnChanges} from '@angular/core';
import {DestinyItemModel} from "../../../model/destiny/destiny-item.model";
import {DestinyItemNomenclature} from "../../../model/destiny/nomenclature/destiny-item.nomenclature";
import {DestinyComponent} from "../destiny.component";
import {Engrams, MainCurrencies, Synthweaves} from "../../../model/destiny/enum/DestinyMainInventoryEnum";

@Component({
  selector: 'destiny-main-inventory',
  templateUrl: './destiny-main-inventory.component.html',
  styleUrls: ['./destiny-main-inventory.component.css']
})
export class DestinyMainInventoryComponent implements OnChanges {

  @Input() profileInventory!: DestinyItemModel[];
  @Input() profileCurrencies!: DestinyItemModel[];
  @Input() itemNomenclatures!: Map<number, DestinyItemNomenclature>;

  mainCurrencies: DestinyItemModel[] = [];
  engrams: DestinyItemModel[] = [];
  synthweaves: DestinyItemModel[] = [];

  ngOnChanges(): void {
    this.mainCurrencies = [];
    this.engrams = [];
    this.synthweaves = [];
    MainCurrencies.forEach(itemHash => {
      this.mainCurrencies.push(this.findItem(itemHash));
    })
    Engrams.forEach(itemHash => {
      this.engrams.push(this.findItem(itemHash));
    })
    Synthweaves.forEach(itemHash => {
      this.synthweaves.push(this.findItem(itemHash));
    })
  }

  findItem(itemHash: number){
    let item: DestinyItemModel = new DestinyItemModel();
    item.itemHash = itemHash;
    item.itemNomenclature = this.itemNomenclatures.get(itemHash)!;
    const inventoryItems = this.profileInventory.filter(item => item.itemHash === itemHash);
    const currencyItems = this.profileCurrencies.filter(item => item.itemHash === itemHash);
    item.quantity = [...inventoryItems, ...currencyItems].reduce((sum, item) => sum + item.quantity, 0);
    return item;
  }

  protected readonly DestinyComponent = DestinyComponent;
}
