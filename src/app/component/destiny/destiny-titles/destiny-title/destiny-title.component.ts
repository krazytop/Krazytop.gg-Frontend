import {Component, Input} from '@angular/core';
import {DestinyPresentationTreeModel} from "../../../../model/destiny/destiny-presentation-tree.model";
import {DestinyComponent} from "../../destiny.component";
import {DestinyNodeProgressionModel} from "../../../../model/destiny/destiny-node-progression.model";
import {isRecordComplete} from "../../destiny-record/destiny-record.component";
import {DestinyComponentSelectorComponent} from "../../destiny-component-selector/destiny-component-selector.component";
import {DestinyUrlArgs} from "../../../../model/destiny/destiny-url-args";

@Component({
  selector: 'destiny-title',
  templateUrl: './destiny-title.component.html',
  styleUrls: ['./destiny-title.component.css', '../../destiny-record/destiny-record.component.css']
})
export class DestinyTitleComponent {

  @Input() title!: DestinyPresentationTreeModel;
  @Input() presentationNodeProgress!: Map<number, DestinyNodeProgressionModel>
  @Input() urlArgs!: DestinyUrlArgs;

  protected readonly DestinyComponent = DestinyComponent;
  protected readonly isRecordComplete = isRecordComplete;
  protected readonly DestinyComponentSelectorComponent = DestinyComponentSelectorComponent;
}
