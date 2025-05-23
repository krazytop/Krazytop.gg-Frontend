import {Injectable} from "@angular/core";
import {DestinyItemModel} from "../../model/destiny/destiny-item.model";
import {DestinyRecordNomenclature} from "../../model/destiny/nomenclature/destiny-record.nomenclature";
import {DestinyItemStateEnum} from "../../model/destiny/enum/DestinyItemStateEnum";
import {DestinyTierTypeEnum} from "../../model/destiny/enum/DestinyTierTypeEnum";
import {DestinyItemDamageTypeEnum} from "../../model/destiny/enum/DestinyItemDamageTypeEnum";
import {DestinyItemService} from "./destiny-item.service";

@Injectable({ providedIn: 'root' })
export class DestinyCharacterItemFiltersService {

  constructor(private itemService: DestinyItemService) {
  }

  rarityFilters = {
    basic: false,
    ordinary: false,
    uncommon: false,
    legendary: false,
    exotic: false
  }

  damageTypeFilters = {
    kinetic: false,
    arc: false,
    thermal: false,
    void: false,
    stasis: false,
    strand: false
  }

  statusFilters = {
    crafted: false,
    locked: false,
    masterwork: false
  }

  managementFilters = {
    notLocked: false,
    notCrafted: false,
    duplicated: false
  }

  shouldItemBeDisplayed(item: DestinyItemModel, itemCraftedRecord: DestinyRecordNomenclature | undefined, isItemDuplicated: boolean) {
    let shouldBeDisplayed = true;
    shouldBeDisplayed = shouldBeDisplayed && this.filterByItemRarity(item);
    shouldBeDisplayed = shouldBeDisplayed && this.filterByDamageType(item);
    shouldBeDisplayed = shouldBeDisplayed && this.filterByStatus(item);
    shouldBeDisplayed = shouldBeDisplayed && this.filterByManagement(item, itemCraftedRecord, isItemDuplicated);
    return shouldBeDisplayed;
  }

  filterByItemRarity(item: DestinyItemModel) {
    let shouldBeDisplayed = true;
    if (this.rarityFilters.basic) {
      shouldBeDisplayed = item.itemNomenclature?.tierTypeHash === DestinyTierTypeEnum.Basic;
    }
    if (this.rarityFilters.ordinary) {
      shouldBeDisplayed = item.itemNomenclature?.tierTypeHash === DestinyTierTypeEnum.Ordinary;
    }
    if (this.rarityFilters.uncommon) {
      shouldBeDisplayed = item.itemNomenclature?.tierTypeHash === DestinyTierTypeEnum.Uncommon;
    }
    if (this.rarityFilters.legendary) {
      shouldBeDisplayed = item.itemNomenclature?.tierTypeHash === DestinyTierTypeEnum.Legendary;
    }
    if (this.rarityFilters.exotic) {
      shouldBeDisplayed = item.itemNomenclature?.tierTypeHash === DestinyTierTypeEnum.Exotic;
    }
    return shouldBeDisplayed;
  }

  filterByDamageType(item: DestinyItemModel) {
    let shouldBeDisplayed = true;
    if (this.damageTypeFilters.kinetic) {
      shouldBeDisplayed = item.itemInstance?.damageType === DestinyItemDamageTypeEnum.Kinetic;
    }
    if (this.damageTypeFilters.thermal) {
      shouldBeDisplayed = item.itemInstance?.damageType === DestinyItemDamageTypeEnum.Thermal;
    }
    if (this.damageTypeFilters.arc) {
      shouldBeDisplayed = item.itemInstance?.damageType === DestinyItemDamageTypeEnum.Arc;
    }
    if (this.damageTypeFilters.void) {
      shouldBeDisplayed = item.itemInstance?.damageType === DestinyItemDamageTypeEnum.Void;
    }
    if (this.damageTypeFilters.stasis) {
      shouldBeDisplayed = item.itemInstance?.damageType === DestinyItemDamageTypeEnum.Stasis;
    }
    if (this.damageTypeFilters.strand) {
      shouldBeDisplayed = item.itemInstance?.damageType === DestinyItemDamageTypeEnum.Strand;
    }
    return shouldBeDisplayed;
  }

  filterByStatus(item: DestinyItemModel) {
    let shouldBeDisplayed = true;
    if (this.statusFilters.crafted) {
      shouldBeDisplayed = shouldBeDisplayed && (item.state & (1 << Math.log2(DestinyItemStateEnum.Crafted))) !== 0;
    }
    if (this.statusFilters.locked) {
      shouldBeDisplayed = shouldBeDisplayed && (item.state & (1 << Math.log2(DestinyItemStateEnum.Locked))) !== 0;
    }
    if (this.statusFilters.masterwork) {
      shouldBeDisplayed = shouldBeDisplayed && this.itemService.isMasterwork(item);
    }
    return shouldBeDisplayed;
  }

  filterByManagement(item: DestinyItemModel, itemCraftedRecord: DestinyRecordNomenclature | undefined, isItemDuplicated: boolean) {
    let shouldBeDisplayed = true;
    if (this.managementFilters.duplicated) {
      shouldBeDisplayed = shouldBeDisplayed && (item.state & (1 << Math.log2(DestinyItemStateEnum.Crafted))) === 0 && isItemDuplicated;
    }
    if (this.managementFilters.notLocked) {
      shouldBeDisplayed = shouldBeDisplayed && (item.state & (1 << Math.log2(DestinyItemStateEnum.Locked))) === 0;
    }
    if (this.managementFilters.notCrafted) {
      if (itemCraftedRecord) {
        shouldBeDisplayed = shouldBeDisplayed && (item.state & (1 << Math.log2(DestinyItemStateEnum.Crafted))) === 0;
      } else {
        shouldBeDisplayed = false;
      }
    }
    return shouldBeDisplayed;
  }

}
