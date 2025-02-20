import {Component, Input, OnChanges} from '@angular/core';
import {DestinyPresentationTreeModel} from "../../../../model/destiny/destiny-presentation-tree.model";
import {DestinyComponent} from "../../destiny.component";
import {DestinyNodeProgressionModel} from "../../../../model/destiny/destiny-node-progression.model";
import {isRecordComplete} from "../../destiny-record/destiny-record.component";
import {ActivatedRoute, Router} from "@angular/router";
import {DestinyComponentSelectorComponent} from "../../destiny-component-selector/destiny-component-selector.component";

@Component({
  selector: 'destiny-title',
  templateUrl: './destiny-title.component.html',
  styleUrls: ['./destiny-title.component.css', '../../destiny-record/destiny-record.component.css']
})
export class DestinyTitleComponent implements OnChanges {

  @Input() title!: DestinyPresentationTreeModel;
  @Input() presentationNodeProgress!: Map<number, DestinyNodeProgressionModel>

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  protected platform!: string;
  protected membership!: string;
  protected character!: string;

  ngOnChanges() {
    this.route.params.subscribe(params => {
      this.platform = params['platform'];
      this.membership = params['membership'];
      this.character = params['character'];
    });
  }

  redirectToTitlesList() {
    this.route.params.subscribe(params => {
      this.router.navigate([`/destiny/${params['platform']}/${params['membership']}/${params['character']}/titles`]);
    });
  }

  protected readonly DestinyComponent = DestinyComponent;
  protected readonly isRecordComplete = isRecordComplete;
  protected readonly DestinyComponentSelectorComponent = DestinyComponentSelectorComponent;
}
