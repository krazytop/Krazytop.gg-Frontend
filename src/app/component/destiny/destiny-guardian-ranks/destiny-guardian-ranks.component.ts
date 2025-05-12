import {Component, Input, OnChanges} from '@angular/core';
import {DestinyPresentationTreeModel} from "../../../model/destiny/destiny-presentation-tree.model";
import {DestinyNodeProgressionModel} from "../../../model/destiny/destiny-node-progression.model";
import {isRecordComplete} from "../destiny-record/destiny-record.component";

@Component({
  selector: 'destiny-guardian-ranks',
  templateUrl: './destiny-guardian-ranks.component.html',
  styleUrls: ['./destiny-guardian-ranks.component.css', '../destiny-record/destiny-record.component.css']
})
export class DestinyGuardianRanksComponent implements OnChanges {

  @Input() presentationTree!: DestinyPresentationTreeModel;
  @Input() presentationNodeProgress!: Map<number, DestinyNodeProgressionModel>;

  selectedRank!: DestinyPresentationTreeModel;
  selectedCategory!: DestinyPresentationTreeModel;

  ngOnChanges() {
    let selectedIndex = this.presentationTree.childrenNode.findIndex(node => {
      const progress = this.presentationNodeProgress.get(node.hash)!
      return progress.progressValue < progress.completionValue;
    });
    if (selectedIndex === -1) {
      selectedIndex = this.presentationTree.childrenNode.length - 1;
    }
    this.selectRank(this.presentationTree.childrenNode[selectedIndex]);

  }

  selectRank(rank: DestinyPresentationTreeModel) {
    this.selectedRank = rank;
    if (rank.childrenNode.length > 0) this.selectCategory(rank.childrenNode[0]);
  }

  selectCategory(category: DestinyPresentationTreeModel) {
    this.selectedCategory = category;
  }

  getImage(index: number) {
    return index == 10 ? 'paragon' : index > 7 ? 'vanquisher' : 'elite';
}

  protected readonly isRecordComplete = isRecordComplete;
}
