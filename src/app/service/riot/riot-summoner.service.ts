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

  public async getSummonerByNameAndTag(tag: string, name: string, isLOL: boolean) {
    const response = await fetch(`${environment.apiURL}${isLOL ? 'lol' : 'tft'}/summoner/${tag}/${name}`, {headers: HTTPRequestService.getBackendHeaders()});
    return await this.httpRequestService.hasResponse(response) ? await response.json() as RIOTSummoner : undefined;
  }

  public async getSummonerByPuuid(puuid: string, isLOL: boolean) {
    const response = await fetch(`${environment.apiURL}${isLOL ? 'lol' : 'tft'}/summoner/${puuid}`, {headers: HTTPRequestService.getBackendHeaders()});
    return await this.httpRequestService.hasResponse(response) ? await response.json() as RIOTSummoner : undefined;
  }

  public async updateSummoner(puuid: string, isLOL: boolean) {
    const response = await fetch(`${environment.apiURL}${isLOL ? 'lol' : 'tft'}/summoner/${puuid}`,
      {headers: HTTPRequestService.getBackendHeaders(), method: 'POST'})
    return await this.httpRequestService.hasResponse(response) ? await response.json() as RIOTSummoner : undefined;
  }

  public async updateLOLData(puuid: string) {
    await this.updateSummoner(puuid, true);
    await this.masteryService.updateMasteries(puuid);
    await this.rankService.updateRanks(puuid, true);
    await this.lolMatchService.updateMatches(puuid);
  }

  public async updateTFTData(puuid: string) {
    await this.updateSummoner(puuid, false);
    await this.rankService.updateRanks(puuid, false);
    await this.tftMatchService.updateMatches(puuid);
  }

}
