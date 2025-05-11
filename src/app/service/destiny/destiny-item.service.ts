import {Injectable} from "@angular/core";
import {DestinyObjectiveNomenclature} from "../../model/destiny/nomenclature/destiny-objective.nomenclature";
import {DestinyObjectiveProgressModel} from "../../model/destiny/destiny-objective-progress.model";
import {DestinyItemModel} from "../../model/destiny/destiny-item.model";
import {DestinyItemNomenclature} from "../../model/destiny/nomenclature/destiny-item.nomenclature";
import {DestinyItemStateEnum} from "../../model/destiny/enum/DestinyItemStateEnum";
import {DestinySocketCategoryModel} from "../../model/destiny/destiny-socket-category.model";
import {DestinySocketCategoryEnum} from "../../model/destiny/enum/DestinySocketCategoryEnum";
import {DestinyTierTypeEnum} from "../../model/destiny/enum/DestinyTierTypeEnum";
import {DestinyItemTypeEnum} from "../../model/destiny/enum/DestinyItemTypeEnum";

@Injectable({ providedIn: 'root' })
export class DestinyItemService {

  plugsNomenclatures: Map< number, DestinyItemNomenclature> = new Map();

  getWeaponPerksSocket(item: DestinyItemModel): DestinySocketCategoryModel{
    return item.itemNomenclature.socketCategories?.find(cat => cat.socketCategoryHash === DestinySocketCategoryEnum.WEAPON_PERKS_2)!;
  }

  getCurrentPlug(item: DestinyItemModel, socketIndex: number) {
    return this.plugsNomenclatures.get(item.itemSockets![socketIndex]!.plugHash!)!
  }

  getAllPlugs(item: DestinyItemModel, socketIndex: number): DestinyItemNomenclature[] {
    const currentPlug = this.getCurrentPlug(item, socketIndex);
    if (!currentPlug) {
      console.log(item)
      console.log(socketIndex)
    }
    return Array.from(item.itemPlugs?.values() ?? [])
      .find(plugs => plugs.some(plug => plug.plugItemHash === currentPlug!.hash))
      ?.map(plugs => this.plugsNomenclatures.get(plugs.plugItemHash)!) ?? [currentPlug];
  }

  isMasterwork(item: DestinyItemModel): boolean {
    const isMarkedAsMasterwork = (item.state & (1 << Math.log2(DestinyItemStateEnum.Masterwork))) !== 0;
    if (item.itemNomenclature.itemType  === DestinyItemTypeEnum.Weapon) {
      const hasAnUpgradedPlug = this.getWeaponPerksSocket(item)?.socketIndexes.some(socketIndex => this.getCurrentPlug(item, socketIndex)?.tierTypeHash === DestinyTierTypeEnum.Ordinary);
      return isMarkedAsMasterwork || hasAnUpgradedPlug;
    } else {
      return isMarkedAsMasterwork;
    }

  }

}
