import {Component, Input, OnChanges} from '@angular/core';
import {isRecordComplete} from "../destiny-record/destiny-record.component";
import {DestinyPresentationTreeNomenclature} from "../../../model/destiny/destiny-presentation-tree.model";
import {DestinyNodeProgressionModel} from "../../../model/destiny/destiny-node-progression.model";

@Component({
  selector: 'destiny-models',
  templateUrl: './destiny-models.component.html',
  styleUrls: ['./destiny-models.component.css', '../destiny-record/destiny-record.component.css']
})
export class DestinyModelsComponent implements OnChanges {

  @Input() kineticWeaponModelsPresentationTree!: DestinyPresentationTreeNomenclature;
  @Input() energyWeaponModelsPresentationTree!: DestinyPresentationTreeNomenclature;
  @Input() powerWeaponModelsPresentationTree!: DestinyPresentationTreeNomenclature;
  @Input() presentationNodeProgress!: Map<number, DestinyNodeProgressionModel>

  weaponCategories: DestinyPresentationTreeNomenclature[] = [];
  showWeaponCategories: Map<DestinyPresentationTreeNomenclature, boolean> = new Map<DestinyPresentationTreeNomenclature, boolean>();

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
