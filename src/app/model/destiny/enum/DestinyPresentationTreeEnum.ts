export enum DestinyPresentationTreeEnum {
  Titles = 616318467,
  ArchivedTitles = 1881970629,
  Catalysts = 2744330515,
}

export function getAllPresentationTrees(){
  return [
    DestinyPresentationTreeEnum.Titles,
    DestinyPresentationTreeEnum.ArchivedTitles,
    DestinyPresentationTreeEnum.Catalysts,
  ]
}
