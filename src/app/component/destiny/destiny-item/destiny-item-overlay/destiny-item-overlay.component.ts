import {Component, ElementRef, Input, OnChanges, OnDestroy, Renderer2} from '@angular/core';
import {DestinyOverlayService} from "../../../../service/destiny/destiny-overlay.service";
import {DestinyItemModel} from "../../../../model/destiny/destiny-item.model";
import {DestinyStatNomenclature} from "../../../../model/destiny/nomenclature/destiny-stat.nomenclature";
import {DestinyTierTypeEnum, getBackgroundColor, getColor} from "../../../../model/destiny/enum/DestinyTierTypeEnum";
import {needAProgressBar, needMs, orderItemStats} from "../../../../model/destiny/enum/DestinyStatEnum";
import {DestinyItemOverlayModel} from "../../../../model/destiny/destiny-item-overlay.model";
import {DestinyComponent} from "../../destiny.component";
import {DestinySocketCategoryEnum} from "../../../../model/destiny/enum/DestinySocketCategoryEnum";
import {DestinySocketCategoryModel} from "../../../../model/destiny/destiny-socket-category.model";
import {DestinyItemTypeEnum} from "../../../../model/destiny/enum/DestinyItemTypeEnum";
import {DestinyItemNomenclature} from "../../../../model/destiny/nomenclature/destiny-item.nomenclature";
import {DestinyObjectiveService} from "../../../../service/destiny/destiny-objective.service";
import {TimeService} from "../../../../service/time.service";

@Component({
  selector: 'destiny-item-overlay',
  templateUrl: './destiny-item-overlay.component.html',
  styleUrls: ['./destiny-item-overlay.component.css']
})
export class DestinyItemOverlayComponent implements OnDestroy, OnChanges {

  @Input() itemOverlay!: DestinyItemOverlayModel;

  private readonly clickListener: () => void;

  constructor(private elementRef: ElementRef, private renderer: Renderer2, private overlayService: DestinyOverlayService, protected objectiveService: DestinyObjectiveService, protected timeService: TimeService) {
    this.clickListener = this.renderer.listen('document', 'click', (event: MouseEvent) => {
      if (!this.elementRef.nativeElement.contains(event.target)) {
        this.overlayService.hideItem();
      }
    });
  }

  ngOnChanges() {
    this.itemOverlay.item!.itemStats?.sort((a,b) => this.itemOverlay.statNomenclatures.get(a.statHash)?.index! - this.itemOverlay.statNomenclatures.get(b.statHash)?.index!);
    this.itemOverlay.item!.itemNomenclature.rewards = this.itemOverlay.item?.itemNomenclature.rewards?.filter(reward => reward.itemHash != 0);
  }

  getStatsTotal(item : DestinyItemModel) {
    return item.itemStats!.reduce((sum, stat) => sum + stat.value, 0)
  }

  get intrinsicTraitSocket(): DestinySocketCategoryModel{
    return this.itemOverlay.item!.itemNomenclature.socketCategories?.find(cat => cat.socketCategoryHash === DestinySocketCategoryEnum.INTRINSIC_TRAITS)!;
  }

  get weaponPerksSocket(): DestinySocketCategoryModel{
    return this.itemOverlay.item!.itemNomenclature.socketCategories?.find(cat => cat.socketCategoryHash === DestinySocketCategoryEnum.WEAPON_PERKS_2)!;
  }

  getCurrentPlug(socketIndex: number) {
    return this.itemOverlay.plugsNomenclatures.get(this.itemOverlay.item!.itemSockets![socketIndex]!.plugHash!)!
  }

  getAllPlugs(socketIndex: number): DestinyItemNomenclature[] {
    const currentPlug = this.getCurrentPlug(socketIndex);
    return Array.from(this.itemOverlay.item?.itemPlugs?.values() ?? [])
      .find(plugs => plugs.some(plug => plug.plugItemHash === currentPlug!.hash))
      ?.map(plugs => this.itemOverlay.plugsNomenclatures.get(plugs.plugItemHash)!) ?? [currentPlug];
  }

  ngOnDestroy() {
    if (this.clickListener) this.clickListener();
  }

  protected readonly getBackgroundColor = getBackgroundColor;
  protected readonly getColor = getColor;
  protected readonly needAProgressBar = needAProgressBar;
  protected readonly needMs = needMs;
  protected readonly orderItemStats = orderItemStats;
  protected readonly DestinyComponent = DestinyComponent;
  protected readonly DestinyItemTypeEnum = DestinyItemTypeEnum;
  protected readonly DestinyTierTypeEnum = DestinyTierTypeEnum;
}
