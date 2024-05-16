import {Component, Input, OnChanges} from '@angular/core';
import {DestinyItemModel} from "../../../model/destiny/destiny-item.model";
import {DestinyComponent} from "../destiny.component";

@Component({
  selector: 'destiny-item',
  templateUrl: './destiny-item.component.html',
  styleUrls: ['./destiny-item.component.css']
})
export class DestinyItemComponent implements OnChanges {

  @Input() item!: DestinyItemModel;

  ngOnChanges() {
  }

  protected readonly DestinyComponent = DestinyComponent;
}
