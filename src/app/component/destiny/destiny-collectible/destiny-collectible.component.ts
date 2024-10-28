import {Component, Input} from '@angular/core';
import {DestinyCollectibleNomenclature} from "../../../model/destiny/nomenclature/destiny-collectible.nomenclature";
import {DestinyComponent} from "../destiny.component";

@Component({
  selector: 'destiny-collectible',
  templateUrl: './destiny-collectible.component.html',
  styleUrls: ['./destiny-collectible.component.css']
})
export class DestinyCollectibleComponent {

  @Input() collectible!: DestinyCollectibleNomenclature;
  protected readonly DestinyComponent = DestinyComponent;
}
