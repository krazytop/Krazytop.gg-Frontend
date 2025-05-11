import {Component, Input, OnChanges} from '@angular/core';
import {DestinyCharacterInventoryModel} from "../../../model/destiny/destiny-character-inventory.model";
import {DestinyItemNomenclature} from "../../../model/destiny/nomenclature/destiny-item.nomenclature";
import {DestinyItemModel} from "../../../model/destiny/destiny-item.model";
import {getClassImage, getClassName} from "../../../model/destiny/enum/DestinyClassEnum";
import {DestinyComponent} from "../destiny.component";
import {DestinyItemInstanceModel} from "../../../model/destiny/destiny-item-instance.model";
import {DestinyObjectiveProgressModel} from "../../../model/destiny/destiny-objective-progress.model";
import {DestinyItemTypeEnum} from "../../../model/destiny/enum/DestinyItemTypeEnum";
import {DestinyInventoryBucketEnum} from "../../../model/destiny/enum/DestinyInventoryBucketsEnum";

@Component({
  selector: 'destiny-contracts-and-quests',
  templateUrl: './destiny-contracts-and-quests.component.html',
  styleUrls: ['./destiny-contracts-and-quests.component.css']
})
export class DestinyContractsAndQuestsComponent implements OnChanges {

  @Input() characterInventories!: DestinyCharacterInventoryModel[];
  @Input() itemNomenclatures!: Map<number, DestinyItemNomenclature>;
  @Input() itemInstances!: Map<string, DestinyItemInstanceModel>;//TODO useless
  @Input() itemObjectives!: Map<string, DestinyObjectiveProgressModel[]>;

  characters: {characterHash: string, contracts: DestinyItemModel[], quests: DestinyItemModel[]}[] = [];

  constructor(protected destinyComponent: DestinyComponent) {}

  ngOnChanges(): void {
    this.characters = [];
    this.characterInventories.forEach(characterInventory => {
      const contracts = characterInventory.items.filter(item => {
        return this.itemNomenclatures.get(item.itemHash)!.itemType == DestinyItemTypeEnum.Bounty;
      });
      contracts.forEach(contract => {
        contract.itemNomenclature = this.itemNomenclatures.get(contract.itemHash)!;
        if (contract.itemInstanceId) contract.itemObjectives = this.itemObjectives.get(contract.itemInstanceId);
        contract.itemNomenclature.rewards?.forEach(reward => reward.itemNomenclature = this.itemNomenclatures.get(reward.itemHash)!)
      })
      const quests = characterInventory.items.filter(item => {
        const nomenclature = this.itemNomenclatures.get(item.itemHash)!;
        return nomenclature.itemType == DestinyItemTypeEnum.QuestStep && nomenclature.bucketTypeHash == DestinyInventoryBucketEnum.Quest;
      });
      quests.forEach(quest => {
        quest.itemNomenclature = this.itemNomenclatures.get(quest.itemHash)!;
        quest.itemObjectives = this.itemObjectives.get(quest.itemInstanceId ?? String(quest.itemHash));
        quest.itemNomenclature.rewards?.forEach(reward => reward.itemNomenclature = this.itemNomenclatures.get(reward.itemHash)!)
      })
      this.characters.push({characterHash: characterInventory.characterHash, contracts: contracts, quests: quests});
    });
  }

  protected readonly getImageByClassHash = getClassImage;
  protected readonly getClassNameByGender = getClassName;
}
