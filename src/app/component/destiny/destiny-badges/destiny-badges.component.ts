import {Component, Input, OnChanges} from '@angular/core';
import {DestinyPresentationTreeModel} from "../../../model/destiny/destiny-presentation-tree.model";
import {DestinyNodeProgressionModel} from "../../../model/destiny/destiny-node-progression.model";
import {DestinyComponent} from "../destiny.component";
import {DestinyItemNomenclature} from "../../../model/destiny/nomenclature/destiny-item.nomenclature";
import {ActivatedRoute, Router} from "@angular/router";
import {DestinyComponentSelectorComponent} from "../destiny-component-selector/destiny-component-selector.component";

@Component({
  selector: 'destiny-badges',
  templateUrl: './destiny-badges.component.html',
  styleUrls: ['./destiny-badges.component.css']
})
export class DestinyBadgesComponent implements OnChanges {

  @Input() badgesPresentationTree!: DestinyPresentationTreeModel;
  @Input() presentationNodeProgress!: Map<number, DestinyNodeProgressionModel>;
  @Input() itemNomenclatures!: Map<number, DestinyItemNomenclature>;

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

  redirectToBadgePage(badge: DestinyPresentationTreeModel) {
    const params = this.route.snapshot.paramMap;
    this.router.navigate([`/destiny/${params.get('platform')}/${params.get('membership')}/${params.get('character')}/badges`], { queryParams: { hash: badge.hash }});
  }

  protected readonly DestinyComponent = DestinyComponent;
  protected readonly DestinyComponentSelectorComponent = DestinyComponentSelectorComponent;
}
