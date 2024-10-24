import {Component, Input} from '@angular/core';
import {DestinyPresentationTreeNomenclature} from "../../../../model/destiny/destiny-presentation-tree.model";
import {DestinyNodeProgressionModel} from "../../../../model/destiny/destiny-node-progression.model";

@Component({
  selector: 'destiny-badge',
  templateUrl: './destiny-badge.component.html',
  styleUrls: ['./destiny-badge.component.css']
})
export class DestinyBadgeComponent {

  @Input() badge!: DestinyPresentationTreeNomenclature;
  @Input() presentationNodeProgress!: Map<number, DestinyNodeProgressionModel>

  isBadgeComplete(): boolean {
    const presentationNodeProgress = this.presentationNodeProgress.get(this.badge.hash)!;
    return presentationNodeProgress.progressValue! >= presentationNodeProgress.completionValue!;
  }

}
