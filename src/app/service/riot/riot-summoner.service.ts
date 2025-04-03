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

  public async getSummonerById(region: string, summonerId: string, isLOL: boolean) {
    const response = await fetch(`${environment.apiURL}${isLOL ? 'lol' : 'tft'}/summoner/${region}/${summonerId}`, {headers: HTTPRequestService.getBackendHeaders()});
    return await this.httpRequestService.hasResponse(response) ? await response.json() as RIOTSummoner : undefined;
  }

  public async updateSummoner(region: string, summonerId: string, isLOL: boolean) {
    const response = await fetch(`${environment.apiURL}${isLOL ? 'lol' : 'tft'}/summoner/${region}/${summonerId}`,
      {headers: HTTPRequestService.getBackendHeaders(), method: 'POST'})
    return await this.httpRequestService.hasResponse(response) ? await response.json() as RIOTSummoner : undefined;
  }

  public async updateLOLData(region: string, puuid: string, summonerId: string) {
    await this.updateSummoner(region, summonerId, true);
    await this.masteryService.updateMasteries(region, puuid);
    await this.rankService.updateRanks(region, summonerId, true);
    await this.lolMatchService.updateMatches(region, puuid);
  }

  public async updateTFTData(region: string, puuid: string, summonerId: string) {
    await this.updateSummoner(region, summonerId, false);
    await this.rankService.updateRanks(region, summonerId, false);
    await this.tftMatchService.updateMatches(region, puuid);
  }

  private async updateLOLMatches(summoner: RIOTSummoner) {
    const response = await fetch(`${environment.apiURL}lol/matches/${summoner.puuid}`,
      {headers: HTTPRequestService.getBackendHeaders(), method: 'POST'});
    await this.httpRequestService.hasResponse(response);
  }

  private async updateTFTMatches(summoner: RIOTSummoner) {
    const response = await fetch(`${environment.apiURL}tft/matches/${summoner.puuid}`,
      {headers: HTTPRequestService.getBackendHeaders(), method: 'POST'});
    await this.httpRequestService.hasResponse(response);
  }

}
