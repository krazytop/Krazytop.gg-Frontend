import {Component, ElementRef, Input} from '@angular/core';
import {DestinyItemModel} from "../../../model/destiny/destiny-item.model";
import {DestinyComponent} from "../destiny.component";
import {DestinyItemStateEnum} from "../../../model/destiny/enum/DestinyItemStateEnum";
import {DestinyItemDamageTypeEnum, getDamageTypeImage} from "../../../model/destiny/enum/DestinyItemDamageTypeEnum";
import {FormatService} from "../../../service/format.service";
import {DestinyOverlayService} from "../../../service/destiny/destiny-overlay.service";
import {DestinyStatNomenclature} from "../../../model/destiny/nomenclature/destiny-stat.nomenclature";
import {DestinyObjectiveService} from "../../../service/destiny/destiny-objective.service";
import {DestinyItemService} from "../../../service/destiny/destiny-item.service";

@Component({
  selector: 'destiny-item',
  templateUrl: './destiny-item.component.html',
  styleUrls: ['./destiny-item.component.css']
})
export class DestinyItemComponent {

  @Input() item!: DestinyItemModel;

  constructor(private elementRef: ElementRef, protected formatService: FormatService, private overlayService: DestinyOverlayService, protected objectiveService: DestinyObjectiveService, protected itemService: DestinyItemService) {
  }

  hasState(item: DestinyItemModel, state: DestinyItemStateEnum): boolean {
    return item.state != null && (item.state & (1 << Math.log2(state))) !== 0;
  }

  showOverlay() {
    const element: Element = this.elementRef.nativeElement;
    const rect = element.getBoundingClientRect();
    const absoluteTop =  window.scrollY + rect.top;
    const absoluteLeft = window.scrollX + rect.left;
    const needToBeInvert = absoluteLeft > (window.innerWidth * 5 / 6);
    this.overlayService.showItem(this.item, absoluteTop, absoluteLeft + (needToBeInvert ? -345 : rect.width + 5));
  }

  protected readonly DestinyComponent = DestinyComponent;
  protected readonly ItemStateEnum = DestinyItemStateEnum;
  protected readonly ItemDamageTypeEnum = DestinyItemDamageTypeEnum;
  protected readonly getDamageTypeImage = getDamageTypeImage;
}
