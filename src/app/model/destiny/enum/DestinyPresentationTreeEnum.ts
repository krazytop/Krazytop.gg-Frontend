export enum DestinyPresentationTreeEnum {
  Titles = 616318467,
  ArchivedTitles = 1881970629,
  Catalyst = 2744330515,
}

export function getAllPresentationTrees(){
  return [
    DestinyPresentationTreeEnum.Titles,
    DestinyPresentationTreeEnum.ArchivedTitles,
    DestinyPresentationTreeEnum.Catalyst,
  ]
}
