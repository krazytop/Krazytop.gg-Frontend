import {Component, Input, OnChanges} from '@angular/core';
import {DestinyPresentationTreeModel} from "../../../model/destiny/destiny-presentation-tree.model";
import {DestinyComponent} from "../destiny.component";
import {DestinyNodeProgressionModel} from "../../../model/destiny/destiny-node-progression.model";
import {ActivatedRoute, Router} from "@angular/router";
import {DestinyComponentSelectorComponent} from "../destiny-component-selector/destiny-component-selector.component";

@Component({
  selector: 'destiny-titles',
  templateUrl: './destiny-titles.component.html',
  styleUrls: ['./destiny-titles.component.css']
})
export class DestinyTitlesComponent implements OnChanges {

  @Input() titlesPresentationTree!: DestinyPresentationTreeModel;
  @Input() archivedTitlesPresentationTree!: DestinyPresentationTreeModel;
  @Input() presentationNodeProgress!: Map<number, DestinyNodeProgressionModel>

  protected platform!: string;
  protected membership!: string;
  protected character!: string;

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnChanges() {
    this.route.params.subscribe(params => {
      this.platform = params['platform'];
      this.membership = params['membership'];
      this.character = params['character'];
    });
  }

  isTitleComplete(title: DestinyPresentationTreeModel): boolean {
    const currentTitleNodeProgress = this.presentationNodeProgress.get(title.hash);
    return currentTitleNodeProgress?.progressValue! >= currentTitleNodeProgress?.completionValue!;
  }

  redirectToTitlePage(title: DestinyPresentationTreeModel) {
    this.route.params.subscribe(params => {
      this.router.navigate([`/destiny/${params['platform']}/${params['membership']}/${params['character']}/titles`], { queryParams: { hash: title.hash }});
    });
  }

  protected readonly DestinyComponent = DestinyComponent;
  protected readonly DestinyComponentSelectorComponent = DestinyComponentSelectorComponent;
}
