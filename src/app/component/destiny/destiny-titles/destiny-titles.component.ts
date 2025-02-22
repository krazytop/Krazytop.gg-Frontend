import {Component, Input} from '@angular/core';
import {DestinyPresentationTreeModel} from "../../../model/destiny/destiny-presentation-tree.model";
import {DestinyComponent} from "../destiny.component";
import {DestinyNodeProgressionModel} from "../../../model/destiny/destiny-node-progression.model";
import {DestinyComponentSelectorComponent} from "../destiny-component-selector/destiny-component-selector.component";
import {DestinyUrlArgs} from "../../../model/destiny/destiny-url-args";

@Component({
  selector: 'destiny-titles',
  templateUrl: './destiny-titles.component.html',
  styleUrls: ['./destiny-titles.component.css']
})
export class DestinyTitlesComponent {

  @Input() titlesPresentationTree!: DestinyPresentationTreeModel;
  @Input() archivedTitlesPresentationTree!: DestinyPresentationTreeModel;
  @Input() presentationNodeProgress!: Map<number, DestinyNodeProgressionModel>
  @Input() urlArgs!: DestinyUrlArgs;

  isTitleComplete(title: DestinyPresentationTreeModel): boolean {
    const currentTitleNodeProgress = this.presentationNodeProgress.get(title.hash);
    return currentTitleNodeProgress?.progressValue! >= currentTitleNodeProgress?.completionValue!;
  }

  protected readonly DestinyComponent = DestinyComponent;
  protected readonly DestinyComponentSelectorComponent = DestinyComponentSelectorComponent;
}
