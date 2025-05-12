export enum DestinyPresentationTreeEnum {
  Titles = 616318467,
  ArchivedTitles = 1881970629,
  Catalysts = 2744330515,
  KineticWeaponModels = 127506319,
  EnergyWeaponModels = 3289524180,
  PowerWeaponModels = 1464475380,
  Badges = 498211331,
  GuardianRanks = 3741753466
}

export function getAllPresentationTrees(){
  return [
    DestinyPresentationTreeEnum.Titles,
    DestinyPresentationTreeEnum.ArchivedTitles,
    DestinyPresentationTreeEnum.Catalysts,
    DestinyPresentationTreeEnum.KineticWeaponModels,
    DestinyPresentationTreeEnum.EnergyWeaponModels,
    DestinyPresentationTreeEnum.PowerWeaponModels,
    DestinyPresentationTreeEnum.Badges,
    DestinyPresentationTreeEnum.GuardianRanks,
  ]
}
