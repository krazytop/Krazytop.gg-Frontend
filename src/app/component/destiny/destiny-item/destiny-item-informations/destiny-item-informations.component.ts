import {Component, Input, OnChanges} from '@angular/core';
import {DestinyItemModel} from "../../../../model/destiny/destiny-item.model";

@Component({
  selector: 'destiny-item-informations',
  templateUrl: './destiny-item-informations.component.html',
  styleUrls: ['./destiny-item-informations.component.css']
})
export class DestinyItemInformationsComponent implements OnChanges {

  @Input() item!: DestinyItemModel;

  ngOnChanges(): void {
  }

}
