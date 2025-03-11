import {Component, ElementRef, Input} from '@angular/core';
import {DestinyItemModel} from "../../../model/destiny/destiny-item.model";
import {DestinyComponent} from "../destiny.component";
import {DestinyItemStateEnum} from "../../../model/destiny/enum/DestinyItemStateEnum";
import {DestinyItemDamageTypeEnum, getDamageTypeImage} from "../../../model/destiny/enum/DestinyItemDamageTypeEnum";
import {FormatService} from "../../../service/format.service";
import {DestinyOverlayService} from "../../../service/destiny/destiny-overlay.service";
import {DestinyStatNomenclature} from "../../../model/destiny/nomenclature/destiny-stat.nomenclature";

@Component({
  selector: 'destiny-item',
  templateUrl: './destiny-item.component.html',
  styleUrls: ['./destiny-item.component.css']
})
export class DestinyItemComponent {

  @Input() item!: DestinyItemModel;

  constructor(private elementRef: ElementRef, protected formatService: FormatService, private overlayService: DestinyOverlayService) {
  }

  hasState(item: DestinyItemModel, state: DestinyItemStateEnum): boolean {
    return item.state != null && (item.state & (1 << Math.log2(state))) !== 0;
  }

  showOverlay() {
    const element: Element = this.elementRef.nativeElement;
    const rect = element.getBoundingClientRect();
    const absoluteTop = rect.top + window.scrollY;
    const absoluteLeft = rect.left + window.scrollX;
    this.overlayService.showItem(this.item, absoluteTop, absoluteLeft + rect.width + 5);
  }

  protected readonly DestinyComponent = DestinyComponent;
  protected readonly ItemStateEnum = DestinyItemStateEnum;
  protected readonly ItemDamageTypeEnum = DestinyItemDamageTypeEnum;
  protected readonly getDamageTypeImage = getDamageTypeImage;
}
