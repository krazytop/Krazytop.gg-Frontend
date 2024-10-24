import {Component, Input} from '@angular/core';
import {DestinyPresentationTreeNomenclature} from "../../../model/destiny/destiny-presentation-tree.model";
import {DestinyNodeProgressionModel} from "../../../model/destiny/destiny-node-progression.model";
import {DestinyComponent} from "../destiny.component";

@Component({
  selector: 'destiny-badges',
  templateUrl: './destiny-badges.component.html',
  styleUrls: ['./destiny-badges.component.css']
})
export class DestinyBadgesComponent {

  @Input() badgesPresentationTree!: DestinyPresentationTreeNomenclature;
  @Input() presentationNodeProgress!: Map<number, DestinyNodeProgressionModel>;

  redirectToBadgePage(badge: DestinyPresentationTreeNomenclature) {
  }

  isBadgeComplete(badge: DestinyPresentationTreeNomenclature) {
    return false && Math.random() >= 0.5;
  }

  protected readonly DestinyComponent = DestinyComponent;
}
