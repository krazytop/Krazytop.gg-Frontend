import {Component, Input, OnChanges} from '@angular/core';
import {DestinyCharacterInventoryModel} from "../../../model/destiny/destiny-character-inventory.model";
import {DestinyItemNomenclature} from "../../../model/destiny/nomenclature/destiny-item.nomenclature";
import {DestinyItemModel} from "../../../model/destiny/destiny-item.model";
import {getClassImage, getClassName} from "../../../model/destiny/enum/DestinyClassEnum";
import {DestinyComponent} from "../destiny.component";
import {DestinyItemInstanceModel} from "../../../model/destiny/destiny-item-instance.model";
import {DestinyObjectiveProgressModel} from "../../../model/destiny/destiny-objective-progress.model";
import {DestinyItemTypeEnum} from "../../../model/destiny/enum/DestinyItemTypeEnum";

@Component({
  selector: 'destiny-contracts',
  templateUrl: './destiny-contracts.component.html',
  styleUrls: ['./destiny-contracts.component.css']
})
export class DestinyContractsComponent implements OnChanges {

  @Input() characterInventories!: DestinyCharacterInventoryModel[];
  @Input() itemNomenclatures!: Map<number, DestinyItemNomenclature>;
  @Input() itemInstances!: Map<number, DestinyItemInstanceModel>;//TODO useless
  @Input() itemObjectives!: Map<number, DestinyObjectiveProgressModel[]>;

  characterContracts: {characterHash: string, contracts: DestinyItemModel[]}[] = [];

  constructor(protected destinyComponent: DestinyComponent) {}

  ngOnChanges(): void {
    this.characterInventories.forEach(characterInventory => {
      const contracts = characterInventory.items.filter(item => {
        return this.itemNomenclatures.get(item.itemHash)!.itemType == DestinyItemTypeEnum.Bounty;
      });
      contracts.forEach(contract => {
        contract.itemNomenclature = this.itemNomenclatures.get(contract.itemHash)!;
        contract.itemObjectives = this.itemObjectives.get(Number(contract.itemInstanceId));
        contract.itemNomenclature.rewards?.forEach(reward => reward.itemNomenclature = this.itemNomenclatures.get(reward.itemHash)!)
      })
      this.characterContracts.push({characterHash: characterInventory.characterHash, contracts: contracts});
    });
  }

  protected readonly getImageByClassHash = getClassImage;
  protected readonly getClassNameByGender = getClassName;
}
