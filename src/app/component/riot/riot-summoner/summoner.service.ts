import {Injectable} from '@angular/core';
import {HeaderService} from "../../../config/headers.service";
import {RIOTSummoner} from "../../../model/riot/riot-summoner.model";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class SummonerService {

  private async getLocalSummoner(region: string, tag: string, name: string) {
    const response = await fetch(`${environment.apiURL}riot/summoner/local/${region}/${tag}/${name}`, {headers: HeaderService.getBackendHeaders()});
    return await response.json() as RIOTSummoner;
  }

  private async getRemoteSummoner(region: string, tag: string, name: string) {
    const response = await fetch(`${environment.apiURL}riot/summoner/remote/${region}/${tag}/${name}`, {headers: HeaderService.getBackendHeaders()});
    return await response.json() as RIOTSummoner;
  }

  public async getSummoner(region: string, tag: string, name: string) {
    let remoteSummoner: RIOTSummoner | undefined;
    const localSummoner: RIOTSummoner = await this.getLocalSummoner(region, tag, name);
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
      {headers: HeaderService.getBackendHeaders(), method: 'POST'})
    return await response.json() as RIOTSummoner;
  }

  private async updateLOLRanks(summoner: RIOTSummoner) {
    const response = await fetch(`${environment.apiURL}lol/rank/${summoner.id}`,
      {headers: HeaderService.getBackendHeaders()});
    return await response.json();
  }

  private async updateTFTRanks(summoner: RIOTSummoner) {
    const response = await fetch(`${environment.apiURL}tft/rank/${summoner.id}`,
      {headers: HeaderService.getBackendHeaders()});
    return await response.json();
  }

  private async updateLOLMatches(summoner: RIOTSummoner) {
    const response = await fetch(`${environment.apiURL}lol/matches/${summoner.puuid}`,
      {headers: HeaderService.getBackendHeaders()});
    return await response.json();
  }

  private async updateTFTMatches(summoner: RIOTSummoner) {
    const response = await fetch(`${environment.apiURL}tft/matches/${summoner.puuid}`,
      {headers: HeaderService.getBackendHeaders()});
    return await response.json();
  }

}
