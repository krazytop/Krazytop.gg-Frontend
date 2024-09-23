import {Injectable} from '@angular/core';
import {HTTPRequestService} from "../../../config/http-request.service";
import {RIOTSummoner} from "../../../model/riot/riot-summoner.model";
import {environment} from "../../../../environments/environment";
import {AlertService} from "../../alert/alert.service";
import {AlertModel} from "../../../model/alert.model";

@Injectable({
  providedIn: 'root',
})
export class SummonerService {

  constructor(private httpRequestService: HTTPRequestService) {
  }

  private async getLocalSummoner(region: string, tag: string, name: string) {
    const response = await fetch(`${environment.apiURL}riot/summoner/local/${region}/${tag}/${name}`, {headers: HTTPRequestService.getBackendHeaders()});
    return await this.httpRequestService.hasResponse(response) ? await response.json() as RIOTSummoner : undefined;
  }

  private async getRemoteSummoner(region: string, tag: string, name: string) {
    const response = await fetch(`${environment.apiURL}riot/summoner/remote/${region}/${tag}/${name}`, {headers: HTTPRequestService.getBackendHeaders()});
    return await this.httpRequestService.hasResponse(response) ? await response.json() as RIOTSummoner : undefined;
  }

  public async getSummoner(region: string, tag: string, name: string) {
    let remoteSummoner: RIOTSummoner | undefined;
    const localSummoner: RIOTSummoner | undefined = await this.getLocalSummoner(region, tag, name);
    if (!localSummoner) {
      remoteSummoner = await this.getRemoteSummoner(region, tag, name);
    }
    return [localSummoner, remoteSummoner];
  }

  public async updateLOLData(summoner: RIOTSummoner) {
    await this.updateSummoner(summoner);
    await this.updateLOLRanks(summoner);
    await this.updateLOLMatches(summoner);
  }

  public async updateTFTData(summoner: RIOTSummoner) {
    await this.updateSummoner(summoner);
    await this.updateTFTRanks(summoner);
    await this.updateTFTMatches(summoner);
  }

  private async updateSummoner(summoner: RIOTSummoner) {
    const response = await fetch(`${environment.apiURL}riot/summoner/update/${summoner.region}/${summoner.tag}/${summoner.name}`,
      {headers: HTTPRequestService.getBackendHeaders(), method: 'POST'})
    await this.httpRequestService.hasResponse(response);
  }

  private async updateLOLRanks(summoner: RIOTSummoner) {
    const response = await fetch(`${environment.apiURL}lol/rank/${summoner.id}`,
      {headers: HTTPRequestService.getBackendHeaders(), method: 'POST'});
    await this.httpRequestService.hasResponse(response);
  }

  private async updateTFTRanks(summoner: RIOTSummoner) {
    const response = await fetch(`${environment.apiURL}tft/rank/${summoner.id}`,
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

}
