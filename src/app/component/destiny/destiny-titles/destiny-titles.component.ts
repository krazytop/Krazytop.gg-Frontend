import {Component, Input, OnChanges} from '@angular/core';
import {DestinyPresentationTreeNomenclature} from "../../../model/destiny/destiny-presentation-tree.model";
import {DestinyComponent} from "../destiny.component";
import {DestinyNodeProgressionModel} from "../../../model/destiny/destiny-node-progression.model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'destiny-titles',
  templateUrl: './destiny-titles.component.html',
  styleUrls: ['./destiny-titles.component.css']
})
export class DestinyTitlesComponent implements OnChanges {

  @Input() isParentComponentReady: boolean = false;
  @Input() titlesPresentationTree!: DestinyPresentationTreeNomenclature;
  @Input() archivedTitlesPresentationTree!: DestinyPresentationTreeNomenclature;
  @Input() presentationNodeProgress!: Map<number, DestinyNodeProgressionModel>

  currentTitleNodeProgress?: DestinyNodeProgressionModel;

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnChanges(): void {
  }

  isTitleComplete(title: DestinyPresentationTreeNomenclature): boolean {
    this.currentTitleNodeProgress = this.presentationNodeProgress.get(title.hash)
    return this.currentTitleNodeProgress?.progressValue! >= this.currentTitleNodeProgress?.completionValue!;
  }

  redirectToTitlePage(title: DestinyPresentationTreeNomenclature) {
    this.route.params.subscribe(params => {
      this.router.navigate([`/destiny/${params['platform']}/${params['membership']}/${params['character']}/titles/${title.hash}`]);
    });
  }

  protected readonly DestinyComponent = DestinyComponent;
}
