import {Component, Input} from '@angular/core';
import {DestinyPresentationTreeModel} from "../../../model/destiny/destiny-presentation-tree.model";
import {DestinyNodeProgressionModel} from "../../../model/destiny/destiny-node-progression.model";

@Component({
  selector: 'destiny-node-results',
  templateUrl: './destiny-node-results.component.html',
  styleUrls: ['./destiny-node-results.component.css', '../../../ui/progress-bar/progress-bar.component.css']
})
export class DestinyNodeResultsComponent {

  @Input() node!: DestinyPresentationTreeModel;
  @Input() nodeProgress!: DestinyNodeProgressionModel;
  @Input() isSelected!: boolean;

  protected readonly Math = Math;
}
