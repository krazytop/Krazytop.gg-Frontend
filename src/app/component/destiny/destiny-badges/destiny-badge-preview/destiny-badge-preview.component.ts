import {Component, Input} from '@angular/core';
import {DestinyComponent} from "../../destiny.component";
import {DestinyPresentationTreeModel} from "../../../../model/destiny/destiny-presentation-tree.model";
import {getClassImageByClassType} from "../../../../model/destiny/enum/DestinyClassEnum";
import {DestinyNodeProgressionModel} from "../../../../model/destiny/destiny-node-progression.model";
import {DestinyItemNomenclature} from "../../../../model/destiny/nomenclature/destiny-item.nomenclature";

@Component({
  selector: 'destiny-badge-preview',
  templateUrl: './destiny-badge-preview.component.html',
  styleUrls: ['./destiny-badge-preview.component.css']
})
export class DestinyBadgePreviewComponent {

  @Input() badge!: DestinyPresentationTreeModel;
  @Input() presentationNodeProgress!: Map<number, DestinyNodeProgressionModel>;
  @Input() itemNomenclatures!: Map<number, DestinyItemNomenclature>;
  @Input() showDetails: boolean = false;

  isBadgeCompleted(badge: DestinyPresentationTreeModel) {
    const completedCharacter = badge.childrenNode.find(character => this.presentationNodeProgress.get(character.hash)!.progressValue >= this.presentationNodeProgress.get(character.hash)!.completionValue);
    return completedCharacter !== undefined;
  }

  isBadgeFullyCompleted(badge: DestinyPresentationTreeModel) {
    const completedCharacters = badge.childrenNode.filter(character => this.presentationNodeProgress.get(character.hash)!.progressValue >= this.presentationNodeProgress.get(character.hash)!.completionValue);
    return completedCharacters.length === 3;
  }

  getClassImage(character: DestinyPresentationTreeModel) {
    for(let collectible of character.childrenCollectible) {
      const item = this.itemNomenclatures.get(collectible.itemHash);
      if (item?.classType != 3) {
        return getClassImageByClassType(item!.classType);
      }
    }
    return 'none';
  }

  protected readonly DestinyComponent = DestinyComponent;
}
