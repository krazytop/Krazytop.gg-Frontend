import {Component, Input} from '@angular/core';
import {DestinyItemModel} from "../../../model/destiny/destiny-item.model";
import {DestinyComponent} from "../destiny.component";
import {DestinyItemStateEnum} from "../../../model/destiny/enum/DestinyItemStateEnum";
import {DestinyItemDamageTypeEnum, getDamageTypeImage} from "../../../model/destiny/enum/DestinyItemDamageTypeEnum";
import {FormatService} from "../../../service/format.service";

@Component({
  selector: 'destiny-item',
  templateUrl: './destiny-item.component.html',
  styleUrls: ['./destiny-item.component.css']
})
export class DestinyItemComponent {

  @Input() item!: DestinyItemModel;

  constructor(protected formatService: FormatService) {
  }

  hasState(item: DestinyItemModel, state: DestinyItemStateEnum): boolean {
    return item.state != null && (item.state & (1 << Math.log2(state))) !== 0;
  }

  protected readonly DestinyComponent = DestinyComponent;
  protected readonly ItemStateEnum = DestinyItemStateEnum;
  protected readonly ItemDamageTypeEnum = DestinyItemDamageTypeEnum;
  protected readonly getDamageTypeImage = getDamageTypeImage;
}
