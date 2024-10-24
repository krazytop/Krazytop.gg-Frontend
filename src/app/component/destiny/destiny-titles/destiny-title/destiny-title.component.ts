import {Component, Input} from '@angular/core';
import {DestinyPresentationTreeNomenclature} from "../../../../model/destiny/destiny-presentation-tree.model";
import {DestinyComponent} from "../../destiny.component";
import {DestinyNodeProgressionModel} from "../../../../model/destiny/destiny-node-progression.model";
import {isRecordComplete} from "../../destiny-record/destiny-record.component";

@Component({
  selector: 'destiny-title',
  templateUrl: './destiny-title.component.html',
  styleUrls: ['./destiny-title.component.css', '../../destiny-record/destiny-record.component.css']
})
export class DestinyTitleComponent {

  @Input() title!: DestinyPresentationTreeNomenclature;
  @Input() presentationNodeProgress!: Map<number, DestinyNodeProgressionModel>

  isTitleComplete(): boolean {
    const presentationNodeProgress = this.presentationNodeProgress.get(this.title.hash)!;
    return presentationNodeProgress.progressValue! >= presentationNodeProgress.completionValue!;
  }

  protected readonly DestinyComponent = DestinyComponent;
  protected readonly isRecordComplete = isRecordComplete;
}
