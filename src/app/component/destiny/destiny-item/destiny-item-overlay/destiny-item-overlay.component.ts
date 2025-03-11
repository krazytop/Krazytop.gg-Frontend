import {Component, ElementRef, Input, OnChanges, OnDestroy, Renderer2} from '@angular/core';
import {DestinyOverlayService} from "../../../../service/destiny/destiny-overlay.service";
import {DestinyItemModel} from "../../../../model/destiny/destiny-item.model";
import {DestinyStatNomenclature} from "../../../../model/destiny/nomenclature/destiny-stat.nomenclature";
import {getBackgroundColor, getColor} from "../../../../model/destiny/enum/DestinyTierTypeEnum";
import {needAProgressBar, needMs, orderItemStats} from "../../../../model/destiny/enum/DestinyStatEnum";

@Component({
  selector: 'destiny-item-overlay',
  templateUrl: './destiny-item-overlay.component.html',
  styleUrls: ['./destiny-item-overlay.component.css']
})
export class DestinyItemOverlayComponent implements OnDestroy, OnChanges {

  @Input() item!: DestinyItemModel;
  @Input() statNomenclatures!: Map<number, DestinyStatNomenclature>;

  private readonly clickListener: () => void;

  constructor(private elementRef: ElementRef, private renderer: Renderer2, private overlayService: DestinyOverlayService) {
    this.clickListener = this.renderer.listen('document', 'click', (event: MouseEvent) => {
      if (!this.elementRef.nativeElement.contains(event.target)) {
        this.overlayService.hideItem();
      }
    });
  }

  ngOnChanges() {
    this.item.itemStats?.sort((a,b) => this.statNomenclatures.get(a.statHash)?.index! - this.statNomenclatures.get(b.statHash)?.index!);
    console.log(this.item)
  }

  ngOnDestroy() {
    if (this.clickListener) this.clickListener();
  }

  getStatsTotal(item : DestinyItemModel) {
    return item.itemStats!.reduce((sum, stat) => sum + stat.value, 0)
  }

  protected readonly getBackgroundColor = getBackgroundColor;
  protected readonly getColor = getColor;
  protected readonly needAProgressBar = needAProgressBar;
  protected readonly needMs = needMs;
  protected readonly orderItemStats = orderItemStats;
}
