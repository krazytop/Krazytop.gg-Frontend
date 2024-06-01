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

  formatThousands(nb: number) { //TODO duplication lol damage
    if (nb > 1000) {
      const thousands = Math.floor(nb / 1000);
      const remainder = nb % 1000;
      if (thousands > 0) {
        return `${thousands} ${remainder.toString().padStart(3, '0')}`;
      } else {
        return `${remainder}`;
      }
    } else {
      return nb.toString();
    }
  }

  protected readonly DestinyComponent = DestinyComponent;
}
