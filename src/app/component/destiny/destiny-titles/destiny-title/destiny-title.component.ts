import {Component, Input} from '@angular/core';
import {DestinyPresentationTreeModel} from "../../../../model/destiny/destiny-presentation-tree.model";
import {DestinyComponent} from "../../destiny.component";
import {DestinyNodeProgressionModel} from "../../../../model/destiny/destiny-node-progression.model";
import {isRecordComplete} from "../../destiny-record/destiny-record.component";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'destiny-title',
  templateUrl: './destiny-title.component.html',
  styleUrls: ['./destiny-title.component.css', '../../destiny-record/destiny-record.component.css']
})
export class DestinyTitleComponent {

  @Input() title!: DestinyPresentationTreeModel;
  @Input() presentationNodeProgress!: Map<number, DestinyNodeProgressionModel>

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  redirectToTitlesList() {
    this.route.params.subscribe(params => {
      this.router.navigate([`/destiny/${params['platform']}/${params['membership']}/${params['character']}/titles`]);
    });
  }

  isTitleComplete(): boolean {
    const presentationNodeProgress = this.presentationNodeProgress.get(this.title.hash)!;
    return presentationNodeProgress.progressValue! >= presentationNodeProgress.completionValue!;
  }

  protected readonly DestinyComponent = DestinyComponent;
  protected readonly isRecordComplete = isRecordComplete;
}
