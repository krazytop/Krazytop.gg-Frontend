import {Component, Input} from '@angular/core';
import {DestinyPresentationTreeNomenclature} from "../../../model/destiny/destiny-presentation-tree.model";

@Component({
  selector: 'destiny-catalysts',
  templateUrl: './destiny-catalysts.component.html',
  styleUrls: ['./destiny-catalysts.component.css']
})
export class DestinyCatalystsComponent {

  @Input() isParentComponentReady: boolean = false;
  @Input() catalystsPresentationTree!: DestinyPresentationTreeNomenclature;
}
