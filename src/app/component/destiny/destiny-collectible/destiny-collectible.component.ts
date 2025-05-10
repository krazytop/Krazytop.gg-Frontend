import {Component, Input} from '@angular/core';
import {DestinyCollectibleNomenclature} from "../../../model/destiny/nomenclature/destiny-collectible.nomenclature";
import {DestinyComponent} from "../destiny.component";
import {DestinyCollectibleModel} from "../../../model/destiny/destiny-collectible.model";
import {DestinyItemNomenclature} from "../../../model/destiny/nomenclature/destiny-item.nomenclature";

@Component({
  selector: 'destiny-collectible',
  templateUrl: './destiny-collectible.component.html',
  styleUrls: ['./destiny-collectible.component.css']
})
export class DestinyCollectibleComponent {

  @Input() collectible!: DestinyCollectibleModel;
  @Input() collectibleNomenclature!: DestinyCollectibleNomenclature;
  @Input() itemNomenclature!: DestinyItemNomenclature;

  protected readonly DestinyComponent = DestinyComponent;
  protected readonly console = console;
}
