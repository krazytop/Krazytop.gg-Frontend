import {DestinyItemStatModel} from "../destiny-item-stat.model";

export enum DestinyStatEnum {
  StrokePerMinute = 4284893193,
  Magazine = 3871231066,
  RecoilDirection = 2715839340,
  ChargeTime = 2961396640,
  DrawTime = 447667954
}

export function needAProgressBar(statHash: number) {
  return !(statHash === DestinyStatEnum.StrokePerMinute || statHash === DestinyStatEnum.Magazine || statHash === DestinyStatEnum.RecoilDirection || statHash === DestinyStatEnum.ChargeTime || statHash === DestinyStatEnum.DrawTime);
}

export function needMs(statHash: number) {
  return (statHash === DestinyStatEnum.ChargeTime || statHash === DestinyStatEnum.DrawTime);
}

export function orderItemStats(stats: DestinyItemStatModel[]) {
  return stats
    .sort((a,b) => Number(b.statHash === DestinyStatEnum.Magazine) - Number(a.statHash === DestinyStatEnum.Magazine))
    .sort((a,b) => Number(b.statHash === DestinyStatEnum.RecoilDirection) - Number(a.statHash === DestinyStatEnum.RecoilDirection))
    .sort((a,b) => Number(needAProgressBar(b.statHash)) - Number(needAProgressBar(a.statHash)))
    .sort((a,b) => Number(b.statHash === DestinyStatEnum.DrawTime) - Number(a.statHash === DestinyStatEnum.DrawTime))
    .sort((a,b) => Number(b.statHash === DestinyStatEnum.ChargeTime) - Number(a.statHash === DestinyStatEnum.ChargeTime))
    .sort((a,b) => Number(b.statHash === DestinyStatEnum.StrokePerMinute) - Number(a.statHash === DestinyStatEnum.StrokePerMinute));
}
