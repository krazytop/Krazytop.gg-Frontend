import {Component, Input, OnChanges} from '@angular/core';
import {DestinyPresentationTreeNomenclature} from "../../../model/destiny/destiny-presentation-tree.model";
import {isRecordComplete} from "../destiny-record/destiny-record.component";
import {DestinyNodeProgressionModel} from "../../../model/destiny/destiny-node-progression.model";
import {DestinyRecordStateEnum} from "../../../model/destiny/enum/DestinyRecordStateEnum";

@Component({
  selector: 'destiny-catalysts',
  templateUrl: './destiny-catalysts.component.html',
  styleUrls: ['./destiny-catalysts.component.css', '../destiny-record/destiny-record.component.css']
})
export class DestinyCatalystsComponent implements OnChanges {

  @Input() catalystsPresentationTree!: DestinyPresentationTreeNomenclature;
  @Input() presentationNodeProgress!: Map<number, DestinyNodeProgressionModel>

  showWeaponCategories: Map<DestinyPresentationTreeNomenclature, boolean> = new Map<DestinyPresentationTreeNomenclature, boolean>();

  ngOnChanges() { //TODO statinfo
    let isFirstWeaponCategory = true;
    this.catalystsPresentationTree.childrenNode.forEach(weaponCategory => {
      this.showWeaponCategories.set(weaponCategory, isFirstWeaponCategory);
      if (isFirstWeaponCategory) {
        isFirstWeaponCategory = false;
      }
    })
  }

  hasState(record: DestinyNodeProgressionModel, state: DestinyRecordStateEnum): boolean {
    return record.state != null && (record.state & (1 << Math.log2(state))) !== 0;
  }

  protected readonly isRecordComplete = isRecordComplete;
  protected readonly DestinyRecordStateEnum = DestinyRecordStateEnum;
}
