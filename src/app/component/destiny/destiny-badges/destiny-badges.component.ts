import {Component, Input} from '@angular/core';
import {DestinyPresentationTreeNomenclature} from "../../../model/destiny/destiny-presentation-tree.model";
import {DestinyNodeProgressionModel} from "../../../model/destiny/destiny-node-progression.model";
import {DestinyComponent} from "../destiny.component";
import {DestinyItemNomenclature} from "../../../model/destiny/nomenclature/destiny-item.nomenclature";
import {getClassImageByClassType} from "../../../model/destiny/enum/DestinyClassEnum";

@Component({
  selector: 'destiny-badges',
  templateUrl: './destiny-badges.component.html',
  styleUrls: ['./destiny-badges.component.css']
})
export class DestinyBadgesComponent {

  @Input() badgesPresentationTree!: DestinyPresentationTreeNomenclature;
  @Input() presentationNodeProgress!: Map<number, DestinyNodeProgressionModel>;
  @Input() itemNomenclatures!: Map<number, DestinyItemNomenclature>;

  redirectToBadgePage(badge: DestinyPresentationTreeNomenclature) {
  }

  isBadgeCompleted(badge: DestinyPresentationTreeNomenclature) {
    const completedCharacter = badge.childrenNode.find(character => this.presentationNodeProgress.get(character.hash)!.progressValue >= this.presentationNodeProgress.get(character.hash)!.completionValue);
    return completedCharacter != undefined;
  }

  isBadgeFullyComplete(badge: DestinyPresentationTreeNomenclature) {
    const completedCharacters = badge.childrenNode.filter(character => this.presentationNodeProgress.get(character.hash)!.progressValue >= this.presentationNodeProgress.get(character.hash)!.completionValue);
    return completedCharacters.length === 3;
  }

  getClassImage(character: DestinyPresentationTreeNomenclature) {
    for(let collectible of character.childrenCollectible) {
      const item = this.itemNomenclatures.get(collectible.itemHash);
      if (item?.classType != 3) {
        return getClassImageByClassType(item!.classType);
      }
    }
    return 'none';
  }

  protected readonly DestinyComponent = DestinyComponent;
  protected readonly console = console;
}
