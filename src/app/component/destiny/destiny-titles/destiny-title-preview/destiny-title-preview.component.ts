import {Component, Input} from '@angular/core';
import {DestinyComponent} from "../../destiny.component";
import {DestinyPresentationTreeModel} from "../../../../model/destiny/destiny-presentation-tree.model";
import {DestinyNodeProgressionModel} from "../../../../model/destiny/destiny-node-progression.model";

@Component({
  selector: 'destiny-title-preview',
  templateUrl: './destiny-title-preview.component.html',
  styleUrls: ['./destiny-title-preview.component.css']
})
export class DestinyTitlePreviewComponent {

  @Input() title!: DestinyPresentationTreeModel;
  @Input() presentationNodeProgress!: Map<number, DestinyNodeProgressionModel>;
  @Input() showDetails: boolean = false;

  isTitleComplete(title: DestinyPresentationTreeModel): boolean {
    const currentTitleNodeProgress = this.presentationNodeProgress.get(title.hash);
    return currentTitleNodeProgress?.progressValue! >= currentTitleNodeProgress?.completionValue!;
  }

  protected readonly DestinyComponent = DestinyComponent;
}
