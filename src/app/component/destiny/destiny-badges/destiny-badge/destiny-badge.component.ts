import {Component, Input, OnChanges} from '@angular/core';
import {DestinyPresentationTreeNomenclature} from "../../../../model/destiny/destiny-presentation-tree.model";
import {DestinyNodeProgressionModel} from "../../../../model/destiny/destiny-node-progression.model";
import {DestinyItemNomenclature} from "../../../../model/destiny/nomenclature/destiny-item.nomenclature";
import {
  DestinyClassEnum,
  DestinyClassModel
} from '../../../../model/destiny/enum/DestinyClassEnum';
import {DestinyCollectibleNomenclature} from "../../../../model/destiny/nomenclature/destiny-collectible.nomenclature";

@Component({
  selector: 'destiny-badge',
  templateUrl: './destiny-badge.component.html',
  styleUrls: ['./destiny-badge.component.css']
})
export class DestinyBadgeComponent implements OnChanges {

  @Input() badge!: DestinyPresentationTreeNomenclature;
  @Input() presentationNodeProgress!: Map<number, DestinyNodeProgressionModel>
  @Input() itemNomenclatures!: Map<number, DestinyItemNomenclature>

  focusedCollectibles: DestinyCollectibleNomenclature[] = [];

  ngOnChanges() {
    this.selectCharacterClass(Object.values(DestinyClassEnum)[0]);
  }

  isBadgeComplete(): boolean {
    const presentationNodeProgress = this.presentationNodeProgress.get(this.badge.hash)!;
    return presentationNodeProgress.progressValue! >= presentationNodeProgress.completionValue!;
  }

  selectCharacterClass(character: DestinyClassModel) {
    console.log(this.badge)
    for (let node of this.badge.childrenNode) {
      for (let collectible of node.childrenCollectible) {
        const item = this.itemNomenclatures.get(collectible.itemHash)!;
        if (item.classType === (character.classType as number)) {
          this.focusedCollectibles = node.childrenCollectible;
        }
      }
    }
    return 'none';
  }

  protected readonly DestinyClassEnum = DestinyClassEnum;
  protected readonly Object = Object;
}
