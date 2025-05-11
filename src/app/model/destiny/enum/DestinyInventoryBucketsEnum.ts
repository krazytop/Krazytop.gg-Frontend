export enum DestinyInventoryBucketEnum {
  Postmaster = 215593132,
  KineticWeapon = 1498876634,
  EnergyWeapon = 2465295065,
  PowerWeapon = 953998645,
  Helmet = 3448274439,
  Gauntlets = 3551918588,
  ChestArmor = 14239492,
  LegArmor = 20886954,
  ClassObject = 1585787867,
  Ship = 284967655,
  Emblem = 4274335291,
  Engrams = 375726501,
  General = 138197802,
  Quest = 1345459588
}

export function getAllCharacterBuckets(){
  return [
    DestinyInventoryBucketEnum.KineticWeapon,
    DestinyInventoryBucketEnum.EnergyWeapon,
    DestinyInventoryBucketEnum.PowerWeapon,
    DestinyInventoryBucketEnum.Helmet,
    DestinyInventoryBucketEnum.Gauntlets,
    DestinyInventoryBucketEnum.ChestArmor,
    DestinyInventoryBucketEnum.LegArmor,
    DestinyInventoryBucketEnum.ClassObject,
    DestinyInventoryBucketEnum.Ship,
    DestinyInventoryBucketEnum.Emblem]
}
