import {Component, Input} from '@angular/core';
import {DestinyPresentationTreeNomenclature} from "../../../../model/destiny/destiny-presentation-tree.model";
import {DestinyNodeProgressionModel} from "../../../../model/destiny/destiny-node-progression.model";
import {DestinyItemNomenclature} from "../../../../model/destiny/nomenclature/destiny-item.nomenclature";
import {DestinyClassEnum, getClassImageByClassType} from '../../../../model/destiny/enum/DestinyClassEnum';
import {DestinyCollectibleNomenclature} from "../../../../model/destiny/nomenclature/destiny-collectible.nomenclature";
import {DestinyItemModel} from "../../../../model/destiny/destiny-item.model";

@Component({
  selector: 'destiny-badge',
  templateUrl: './destiny-badge.component.html',
  styleUrls: ['./destiny-badge.component.css']
})
export class DestinyBadgeComponent {

  @Input() badge!: DestinyPresentationTreeNomenclature;
  @Input() presentationNodeProgress!: Map<number, DestinyNodeProgressionModel>
  @Input() itemNomenclatures!: Map<number, DestinyItemNomenclature>

  focusedCollectibles: DestinyCollectibleNomenclature[] = [];

  isBadgeComplete(): boolean {
    const presentationNodeProgress = this.presentationNodeProgress.get(this.badge.hash)!;
    return presentationNodeProgress.progressValue! >= presentationNodeProgress.completionValue!;
  }

  selectCharacterClass(character: typeof DestinyClassEnum) {
    for (let node of this.badge.childrenNode) {
      for (let collectible of node.childrenCollectible) {
        const item = this.itemNomenclatures.get(collectible.itemHash)!;
        // @ts-ignore
        if (item.classType === (character['classType'] as number)) {
          this.focusedCollectibles = node.childrenCollectible;
        }
      }
    }
    return 'none';
  }

  getItem(itemHash: number) {
    const item = new DestinyItemModel();
    item.itemNomenclature = this.itemNomenclatures.get(itemHash);
    return item;
  }

  protected readonly DestinyClassEnum = DestinyClassEnum;
  protected readonly Object = Object;
}
