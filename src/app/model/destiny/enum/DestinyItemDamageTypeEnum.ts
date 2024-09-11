import {DestinyComponent} from '../../../component/destiny/destiny.component'
import {DestinyItemModel} from "../destiny-item.model";

export enum DestinyItemDamageTypeEnum {
  None = 0,
  Kinetic = 1,
  Arc = 2,
  Thermal = 3,
  Void = 4,
  Raid = 5,
  Stasis = 6,
  Strand = 7
}

const itemDamageTypeImage: { [key in DestinyItemDamageTypeEnum]: string } = {
  [DestinyItemDamageTypeEnum.None]: "None",
  [DestinyItemDamageTypeEnum.Kinetic]: `${DestinyComponent.ASSET_URL}/common/destiny2_content/icons/DestinyDamageTypeDefinition_3385a924fd3ccb92c343ade19f19a370.png`,
  [DestinyItemDamageTypeEnum.Arc]: `${DestinyComponent.ASSET_URL}/common/destiny2_content/icons/DestinyDamageTypeDefinition_092d066688b879c807c3b460afdd61e6.png`,
  [DestinyItemDamageTypeEnum.Thermal]: `${DestinyComponent.ASSET_URL}/common/destiny2_content/icons/DestinyDamageTypeDefinition_2a1773e10968f2d088b97c22b22bba9e.png`,
  [DestinyItemDamageTypeEnum.Void]: `${DestinyComponent.ASSET_URL}/common/destiny2_content/icons/DestinyDamageTypeDefinition_ceb2f6197dccf3958bb31cc783eb97a0.png`,
  [DestinyItemDamageTypeEnum.Raid]: "None",
  [DestinyItemDamageTypeEnum.Stasis]: `${DestinyComponent.ASSET_URL}/common/destiny2_content/icons/DestinyDamageTypeDefinition_530c4c3e7981dc2aefd24fd3293482bf.png`,
  [DestinyItemDamageTypeEnum.Strand]: `${DestinyComponent.ASSET_URL}/common/destiny2_content/icons/DestinyDamageTypeDefinition_b2fe51a94f3533f97079dfa0d27a4096.png`
};

export function getDamageTypeImage(item: DestinyItemModel): string {
  return itemDamageTypeImage[item.itemInstance?.damageType!];
}
