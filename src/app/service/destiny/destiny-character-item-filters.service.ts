import {Injectable} from "@angular/core";
import {DestinyItemModel} from "../../model/destiny/destiny-item.model";
import {DestinyRecordNomenclature} from "../../model/destiny/nomenclature/destiny-record.nomenclature";
import {DestinyItemStateEnum} from "../../model/destiny/enum/DestinyItemStateEnum";
import {DestinyTierTypeEnum} from "../../model/destiny/enum/DestinyTierTypeEnum";

@Injectable({ providedIn: 'root' })
export class DestinyCharacterItemFiltersService {

  highlightBasicItems = false;
  highlightOrdinaryItems = false;
  highlightUncommonItems = false;
  highlightLegendaryItems = false;
  highlightExoticItems = false;

  highlightUnlockedItems = false;
  highlightNotCraftedItems = false;
  highlightDuplicateItems = false;

  shouldItemBeDisplayed(item: DestinyItemModel, itemCraftedRecord: DestinyRecordNomenclature | undefined, isItemDuplicated: boolean) {
    let shouldBeDisplayed = true;
    if (this.highlightDuplicateItems) {
      shouldBeDisplayed = shouldBeDisplayed && (item.state & (1 << Math.log2(DestinyItemStateEnum.Crafted))) === 0 && isItemDuplicated;
    }
    shouldBeDisplayed = shouldBeDisplayed && this.filterByItemRarity(item);
    if (this.highlightUnlockedItems) {
      shouldBeDisplayed = shouldBeDisplayed && (item.state & (1 << Math.log2(DestinyItemStateEnum.Locked))) === 0;
    }
    if (this.highlightNotCraftedItems) {
      if (itemCraftedRecord) {
        shouldBeDisplayed = shouldBeDisplayed && (item.state & (1 << Math.log2(DestinyItemStateEnum.Crafted))) === 0;
      } else {
        shouldBeDisplayed = false;
      }
    }
    return shouldBeDisplayed;
  }

  filterByItemRarity(item: DestinyItemModel) {
    let shouldBeDisplayed = true;
    if (this.highlightBasicItems) {
      shouldBeDisplayed = item.itemNomenclature?.tierTypeHash === DestinyTierTypeEnum.Basic;
    }
    if (this.highlightOrdinaryItems) {
      shouldBeDisplayed = item.itemNomenclature?.tierTypeHash === DestinyTierTypeEnum.Ordinary;
    }
    if (this.highlightUncommonItems) {
      shouldBeDisplayed = item.itemNomenclature?.tierTypeHash === DestinyTierTypeEnum.Uncommon;
    }
    if (this.highlightLegendaryItems) {
      shouldBeDisplayed = item.itemNomenclature?.tierTypeHash === DestinyTierTypeEnum.Legendary;
    }
    if (this.highlightExoticItems) {
      shouldBeDisplayed = item.itemNomenclature?.tierTypeHash === DestinyTierTypeEnum.Exotic;
    }
    return shouldBeDisplayed;
  }

}
