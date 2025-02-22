import {Component, Input} from '@angular/core';
import {DestinyPresentationTreeModel} from "../../../model/destiny/destiny-presentation-tree.model";
import {DestinyNodeProgressionModel} from "../../../model/destiny/destiny-node-progression.model";
import {DestinyComponent} from "../destiny.component";
import {DestinyItemNomenclature} from "../../../model/destiny/nomenclature/destiny-item.nomenclature";
import {DestinyComponentSelectorComponent} from "../destiny-component-selector/destiny-component-selector.component";
import {DestinyUrlArgs} from "../../../model/destiny/destiny-url-args";

@Component({
  selector: 'destiny-badges',
  templateUrl: './destiny-badges.component.html',
  styleUrls: ['./destiny-badges.component.css']
})
export class DestinyBadgesComponent {

  @Input() badgesPresentationTree!: DestinyPresentationTreeModel;
  @Input() presentationNodeProgress!: Map<number, DestinyNodeProgressionModel>;
  @Input() itemNomenclatures!: Map<number, DestinyItemNomenclature>;
  @Input() urlArgs!: DestinyUrlArgs;

  protected readonly DestinyComponent = DestinyComponent;
  protected readonly DestinyComponentSelectorComponent = DestinyComponentSelectorComponent;
}
