import {Injectable} from "@angular/core";
import {RIOTSummoner} from "../../model/riot/riot-summoner.model";
import {TFTMatch} from "../../model/tft/tft-match.model";
import {environment} from "../../../environments/environment";
import {HTTPRequestService} from "../../config/http-request.service";

@Injectable({
  providedIn: 'root',
})
export class TFTMatchService {

  constructor(private httpRequestService: HTTPRequestService) {
  }

  async getMatches(puuid: string, pageNb: number, queue: string, set: number) {
    const response = await fetch(`${environment.apiURL}tft/matches/${puuid}/${pageNb}/${queue}/${set}`, {headers: HTTPRequestService.getBackendHeaders()});
    return await this.httpRequestService.hasResponse(response) ? await response.json() as TFTMatch[]: [];
  }

  async getMatchesCount(puuid: string, queue: string, set: number) {
    const response = await fetch(`${environment.apiURL}tft/matches/count/${puuid}/${queue}/${set}`, {headers: HTTPRequestService.getBackendHeaders()});
    return await this.httpRequestService.hasResponse(response) ? await response.json() as number: 0;
  }

  async updateMatches(region: string, puuid: string) {
    const response = await fetch(`${environment.apiURL}tft/matches/${region}/${puuid}`,
      {headers: HTTPRequestService.getBackendHeaders(), method: 'POST'});
    await this.httpRequestService.hasResponse(response);
  }

  public getMatchesStreak(matches: TFTMatch[], summoner: RIOTSummoner) {
    let currentStreak = 0;
    let lastResult: string | undefined;

    for (const match of matches) {
      const result = this.isMatchWon(match, summoner) ? 'VICTORY' : 'DEFEAT';
      if (!lastResult || lastResult === result) {
        currentStreak++;
      } else {
        break;
      }
      lastResult = result;
    }
    return (lastResult === 'VICTORY') ? currentStreak : -currentStreak;
  }

  public isMatchWon(match: TFTMatch, summoner: RIOTSummoner) {
    return this.getSummonerParticipant(match, summoner).hasWin;
  }

  public getSummonerParticipant(match: TFTMatch, summoner: RIOTSummoner) {
    return match.participants.find(participant => participant.summoner.puuid === summoner.puuid)!;
  }

  public getPlacement(match: TFTMatch, summoner: RIOTSummoner) {
    return this.getSummonerParticipant(match, summoner).placement;
  }

}
