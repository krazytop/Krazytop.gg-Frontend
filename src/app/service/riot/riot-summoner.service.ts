import {Injectable} from '@angular/core';
import {HTTPRequestService} from "../../config/http-request.service";
import {RIOTSummoner} from "../../model/riot/riot-summoner.model";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class RIOTSummonerService {

  constructor(private httpRequestService: HTTPRequestService) {
  }

  private async getLocalSummoner(region: string, tag: string, name: string, isLOL: boolean) {
    const response = await fetch(`${environment.apiURL}${isLOL ? 'lol' : 'tft'}/summoner/local/${region}/${tag}/${name}`, {headers: HTTPRequestService.getBackendHeaders()});
    return await this.httpRequestService.hasResponse(response) ? await response.json() as RIOTSummoner : undefined;
  }

  private async getRemoteSummoner(region: string, tag: string, name: string, isLOL: boolean) {
    const response = await fetch(`${environment.apiURL}${isLOL ? 'lol' : 'tft'}/summoner/remote/${region}/${tag}/${name}`, {headers: HTTPRequestService.getBackendHeaders()});
    return await this.httpRequestService.hasResponse(response) ? await response.json() as RIOTSummoner : undefined;
  }

  public async getSummoner(region: string, tag: string, name: string, isLOL: boolean) {
    let remoteSummoner: RIOTSummoner | undefined;
    const localSummoner: RIOTSummoner | undefined = await this.getLocalSummoner(region, tag, name, isLOL);
    if (!localSummoner) {
      remoteSummoner = await this.getRemoteSummoner(region, tag, name, isLOL);
    }
    return [localSummoner, remoteSummoner];
  }

  public async updateLOLData(summoner: RIOTSummoner) {
    await this.updateLOLSummoner(summoner);
    await this.updateLOLMasteries(summoner);
    await this.updateLOLRanks(summoner);
    await this.updateLOLMatches(summoner);
  }

  public async updateTFTData(summoner: RIOTSummoner) {
    await this.updateTFTSummoner(summoner);
    await this.updateTFTRanks(summoner);
    await this.updateTFTMatches(summoner);
  }

  private async updateLOLSummoner(summoner: RIOTSummoner) {
    const response = await fetch(`${environment.apiURL}lol/summoner/update/${summoner.region}/${summoner.tag}/${summoner.name}`,
      {headers: HTTPRequestService.getBackendHeaders(), method: 'POST'})
    await this.httpRequestService.hasResponse(response);
  }

  private async updateTFTSummoner(summoner: RIOTSummoner) {
    const response = await fetch(`${environment.apiURL}tft/summoner/update/${summoner.region}/${summoner.tag}/${summoner.name}`,
      {headers: HTTPRequestService.getBackendHeaders(), method: 'POST'})
    await this.httpRequestService.hasResponse(response);
  }

  private async updateLOLRanks(summoner: RIOTSummoner) {
    const response = await fetch(`${environment.apiURL}lol/ranks/${summoner.puuid}`,
      {headers: HTTPRequestService.getBackendHeaders(), method: 'POST'});
    await this.httpRequestService.hasResponse(response);
  }

  private async updateTFTRanks(summoner: RIOTSummoner) {
    const response = await fetch(`${environment.apiURL}tft/ranks/${summoner.puuid}`,
      {headers: HTTPRequestService.getBackendHeaders(), method: 'POST'});
    await this.httpRequestService.hasResponse(response);
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

  private async updateLOLMasteries(summoner: RIOTSummoner) {
    const response = await fetch(`${environment.apiURL}lol/masteries/${summoner.puuid}`,
      {headers: HTTPRequestService.getBackendHeaders(), method: 'POST'});
    await this.httpRequestService.hasResponse(response);
  }

}
