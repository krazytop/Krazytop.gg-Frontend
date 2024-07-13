import {DestinyItemModel} from "../destiny-item.model";

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
  General = 138197802
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

export function isWeapon(item: DestinyItemModel){
  const bucket = item.bucketHash;
  return bucket == DestinyInventoryBucketEnum.KineticWeapon
    || bucket == DestinyInventoryBucketEnum.EnergyWeapon
    || bucket == DestinyInventoryBucketEnum.PowerWeapon;
}

export function isArmor(item: DestinyItemModel){
  const bucket = item.bucketHash;
  return bucket == DestinyInventoryBucketEnum.Helmet
    || bucket == DestinyInventoryBucketEnum.Gauntlets
    || bucket == DestinyInventoryBucketEnum.ChestArmor
    || bucket == DestinyInventoryBucketEnum.LegArmor
    || bucket == DestinyInventoryBucketEnum.ClassObject;
}
