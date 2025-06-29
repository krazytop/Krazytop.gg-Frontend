import {Injectable} from '@angular/core';
import {HTTPRequestService} from "../../config/http-request.service";
import {RIOTSummoner} from "../../model/riot/riot-summoner.model";
import {environment} from "../../../environments/environment";
import {RIOTRankService} from "./riot-rank.service";
import {LOLMasteryService} from "../lol/lol-mastery.service";
import {LOLMatchService} from "../lol/lol-match.service";
import {TFTMatchService} from "../tft/tft-match.service";

@Injectable({
  providedIn: 'root',
})
export class RIOTSummonerService {

  constructor(private httpRequestService: HTTPRequestService, private rankService: RIOTRankService, private masteryService: LOLMasteryService, private lolMatchService: LOLMatchService, private tftMatchService: TFTMatchService) {
  }

  public async getSummonerByNameAndTag(region: string, tag: string, name: string, isLOL: boolean) {
    const response = await fetch(`${environment.apiURL}${isLOL ? 'lol' : 'tft'}/summoner/${region}/${tag}/${name}`, {headers: HTTPRequestService.getBackendHeaders()});
    return await this.httpRequestService.hasResponse(response) ? await response.json() as RIOTSummoner : undefined;
  }

  public async getSummonerByPuuid(region: string | null, puuid: string, isLOL: boolean) {
    const response = await fetch(`${environment.apiURL}${isLOL ? 'lol' : 'tft'}/summoner/${region}/${puuid}`, {headers: HTTPRequestService.getBackendHeaders()});
    return await this.httpRequestService.hasResponse(response) ? await response.json() as RIOTSummoner : undefined;
  }

  public async updateSummoner(region: string, puuid: string, isLOL: boolean) {
    const response = await fetch(`${environment.apiURL}${isLOL ? 'lol' : 'tft'}/summoner/${region}/${puuid}`,
      {headers: HTTPRequestService.getBackendHeaders(), method: 'POST'})
    return await this.httpRequestService.hasResponse(response) ? await response.json() as RIOTSummoner : undefined;
  }

  public async updateLOLData(region: string, puuid: string) {
    await this.updateSummoner(region, puuid, true);
    //await this.masteryService.updateMasteries(region, puuid);
    await this.rankService.updateRanks(region, puuid, true);
    //await this.lolMatchService.updateMatches(region, puuid);
  }

  public async updateTFTData(region: string, puuid: string) {
    await this.updateSummoner(region, puuid, false);
    await this.rankService.updateRanks(region, puuid, false);
    await this.tftMatchService.updateMatches(region, puuid);
  }

}
