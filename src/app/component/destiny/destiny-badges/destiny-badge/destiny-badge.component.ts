import {Component, Input, OnChanges} from '@angular/core';
import {DestinyPresentationTreeNomenclature} from "../../../../model/destiny/destiny-presentation-tree.model";
import {DestinyNodeProgressionModel} from "../../../../model/destiny/destiny-node-progression.model";
import {DestinyItemNomenclature} from "../../../../model/destiny/nomenclature/destiny-item.nomenclature";
import {
  DestinyClassEnum,
  DestinyClassModel
} from '../../../../model/destiny/enum/DestinyClassEnum';
import {DestinyCollectibleNomenclature} from "../../../../model/destiny/nomenclature/destiny-collectible.nomenclature";
import {DestinyCollectibleModel} from "../../../../model/destiny/destiny-collectible.model";

@Component({
  selector: 'destiny-badge',
  templateUrl: './destiny-badge.component.html',
  styleUrls: ['./destiny-badge.component.css']
})
export class DestinyBadgeComponent implements OnChanges {

  @Input() badge!: DestinyPresentationTreeNomenclature;
  @Input() presentationNodeProgress!: Map<number, DestinyNodeProgressionModel>
  @Input() itemNomenclatures!: Map<number, DestinyItemNomenclature>
  @Input() characterCollectibles!: Map<number, Map<number, DestinyCollectibleModel>>;
  @Input() profileCollectibles!: Map<number, DestinyCollectibleModel>;

  focusedCollectibles!: DestinyCollectibleNomenclature[];

  ngOnChanges() {
    this.selectCharacterClass(Object.values(DestinyClassEnum)[0]);
  }

  isBadgeComplete(): boolean {
    const presentationNodeProgress = this.presentationNodeProgress.get(this.badge.hash)!;
    return presentationNodeProgress.progressValue! >= presentationNodeProgress.completionValue!;
  }

  getCollectible(collectibleHash: number) {
    const allCollectibles = new Map<number, DestinyCollectibleModel>();
    Object.entries(this.profileCollectibles).forEach(
      ([collectibleHash, collectible]) => {
        allCollectibles.set(Number(collectibleHash), collectible);
      }
    )
    for (let collectibles of this.characterCollectibles.values()) {
      Object.entries(collectibles).forEach(
        ([collectibleHash, collectible]) => {
          allCollectibles.set(Number(collectibleHash), collectible as unknown as DestinyCollectibleModel);
        }
      )
    }
    return allCollectibles.get(collectibleHash)!;
  }

  selectCharacterClass(character: DestinyClassModel) {
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
