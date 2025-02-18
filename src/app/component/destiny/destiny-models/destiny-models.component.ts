import {Component, Input, OnChanges} from '@angular/core';
import {isRecordComplete} from "../destiny-record/destiny-record.component";
import {DestinyPresentationTreeModel} from "../../../model/destiny/destiny-presentation-tree.model";
import {DestinyNodeProgressionModel} from "../../../model/destiny/destiny-node-progression.model";

@Component({
  selector: 'destiny-models',
  templateUrl: './destiny-models.component.html',
  styleUrls: ['./destiny-models.component.css', '../destiny-record/destiny-record.component.css']
})
export class DestinyModelsComponent implements OnChanges {

  @Input() kineticWeaponModelsPresentationTree!: DestinyPresentationTreeModel;
  @Input() energyWeaponModelsPresentationTree!: DestinyPresentationTreeModel;
  @Input() powerWeaponModelsPresentationTree!: DestinyPresentationTreeModel;
  @Input() presentationNodeProgress!: Map<number, DestinyNodeProgressionModel>

  weaponCategories: DestinyPresentationTreeModel[] = [];
  showWeaponCategories: Map<DestinyPresentationTreeModel, boolean> = new Map<DestinyPresentationTreeModel, boolean>();

  ngOnChanges() {
    this.weaponCategories = [this.kineticWeaponModelsPresentationTree, this.energyWeaponModelsPresentationTree, this.powerWeaponModelsPresentationTree];
    let isFirstWeaponCategory = true;
    this.weaponCategories.forEach(weaponCategory => {
      this.showWeaponCategories.set(weaponCategory, isFirstWeaponCategory);
      if (isFirstWeaponCategory) {
        isFirstWeaponCategory = false;
      }
    })
  }

  protected readonly isRecordComplete = isRecordComplete;

}
