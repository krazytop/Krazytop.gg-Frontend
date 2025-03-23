export enum DestinyTierTypeEnum {
  Basic = 1801258597, // many basic exists ...
  Ordinary = 2395677314,
  Uncommon = 2127292149,
  Legendary = 4008398120,
  Exotic = 2759499571,
}

export function getBackgroundColor(tier: DestinyTierTypeEnum) {
  if (tier === DestinyTierTypeEnum.Exotic) {
    return '#CFAF33';
  } else if (tier === DestinyTierTypeEnum.Legendary) {
    return '#522F65';
  } else if (tier === DestinyTierTypeEnum.Uncommon) {
    return '#5076A3';
  } else if (tier === DestinyTierTypeEnum.Ordinary) {
    return '#366F40';
  } else {
    return '#C3BCB4';
  }
}

export function getColor(tier: DestinyTierTypeEnum) {
  if (tier === DestinyTierTypeEnum.Legendary || tier === DestinyTierTypeEnum.Uncommon || tier === DestinyTierTypeEnum.Ordinary) {
    return 'white';
  } else {
    return 'black';
  }
}
