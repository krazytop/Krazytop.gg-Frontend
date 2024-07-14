import {Component, Input, OnChanges} from '@angular/core';
import {DestinyPresentationTreeNomenclature} from "../../../../model/destiny/destiny-presentation-tree.model";
import {DestinyComponent} from "../../destiny.component";
import {DestinyNodeProgressionModel} from "../../../../model/destiny/destiny-node-progression.model";
import {isRecordComplete} from "../../destiny-record/destiny-record.component";

@Component({
  selector: 'destiny-title',
  templateUrl: './destiny-title.component.html',
  styleUrls: ['./destiny-title.component.css', '../../destiny-record/destiny-record.component.css']
})
export class DestinyTitleComponent implements OnChanges {

  @Input() isParentComponentReady: boolean = false;
  @Input() title!: DestinyPresentationTreeNomenclature;
  @Input() presentationNodeProgress!: Map<number, DestinyNodeProgressionModel>

  titleNodeProgress?: DestinyNodeProgressionModel

  ngOnChanges() {
    this.titleNodeProgress = this.presentationNodeProgress.get(this.title.hash);
  }

  isTitleComplete(): boolean {
    return this.titleNodeProgress?.progressValue! >= this.titleNodeProgress?.completionValue!;
  }

  protected readonly DestinyComponent = DestinyComponent;
  protected readonly isRecordComplete = isRecordComplete;
}
