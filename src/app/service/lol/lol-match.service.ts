import {Injectable} from "@angular/core";
import {LOLMatch} from "../../model/lol/lol-match.model";
import {RIOTSummoner} from "../../model/riot/riot-summoner.model";
import {environment} from "../../../environments/environment";
import {HTTPRequestService} from "../../config/http-request.service";

@Injectable({
  providedIn: 'root',
})
export class LOLMatchService {

  constructor(private httpRequestService: HTTPRequestService) {
  }

  async getMatches(puuid: string, pageNb: number, queue: string, role: string) {
    const response = await fetch(`${environment.apiURL}lol/matches/${puuid}/${pageNb}/${queue}/${role}`, {headers: HTTPRequestService.getBackendHeaders()});
    return await this.httpRequestService.hasResponse(response) ? await response.json() as LOLMatch[]: [];
  }

  async getMatchesCount(puuid: string, queue: string, role: string) {
    const response = await fetch(`${environment.apiURL}lol/matches/count/${puuid}/${queue}/${role}`, {headers: HTTPRequestService.getBackendHeaders()});
    return await this.httpRequestService.hasResponse(response) ? await response.json() as number: 0;
  }

  async updateMatches(region: string, puuid: string) {
    const response = await fetch(`${environment.apiURL}lol/matches/${region}/${puuid}`,
      {headers: HTTPRequestService.getBackendHeaders(), method: 'POST'});
    await this.httpRequestService.hasResponse(response);
  }

  public getMatchesStreak(matches: LOLMatch[], summoner: RIOTSummoner) {
    let currentStreak = 0;
    let lastResult: string | undefined;
    matches = matches.filter(match => !match.remake);

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

  public isMatchWon(match: LOLMatch, summoner: RIOTSummoner) {
    return this.getSummonerTeam(match, summoner).hasWin;
  }

  public getSummonerTeam(match: LOLMatch, summoner: RIOTSummoner) {
    return match.teams.find(team => team.participants.some(p => p.summoner.puuid === summoner.puuid))!;
  }

  public getSummonerParticipant(match: LOLMatch, summoner: RIOTSummoner) {
    const summonerTeam = this.getSummonerTeam(match, summoner);
    return summonerTeam.participants.find(participant => participant.summoner.puuid === summoner.puuid)!;
  }

  public getWinRate(matches: LOLMatch[], summoner: RIOTSummoner) {
    let [wins, losses] = this.getWinsAndLosses(matches, summoner);
    const winRate =  wins / (wins + losses) * 100;
    return winRate % 1 === 0 ? winRate.toFixed(0) : winRate.toFixed(1);
  }

  public getWinsAndLosses(matches: LOLMatch[], summoner: RIOTSummoner) {
    let wins = 0;
    let losses = 0;
    matches.filter(match => !match.remake)
      .forEach(match => {
        if (this.isMatchWon(match, summoner)) {
          wins++;
        } else {
          losses++;
        }
      });
    return [wins, losses];
  }

  public getRolesWinsAndLosses(matches: LOLMatch[], summoner: RIOTSummoner) {
    let top = [0, 0];
    let jungle = [0, 0];
    let mid = [0, 0];
    let adc = [0, 0];
    let support = [0, 0];
    let other = [0, 0];
    matches.forEach(match => {
      let role = this.getSummonerParticipant(match, summoner).role;
      if (role == 'TOP') {
        top[this.isMatchWon(match, summoner) ? 0 : 1]++;
      } else if (role == 'JUNGLE') {
        jungle[this.isMatchWon(match, summoner) ? 0 : 1]++;
      } else if (role == 'MIDDLE') {
        mid[this.isMatchWon(match, summoner) ? 0 : 1]++;
      } else if (role == 'BOTTOM') {
        adc[this.isMatchWon(match, summoner) ? 0 : 1]++;
      } else if (role == 'UTILITY') {
        support[this.isMatchWon(match, summoner) ? 0 : 1]++;
      } else {
        other[this.isMatchWon(match, summoner) ? 0 : 1]++;
      }
    });
    return [top, jungle, mid, adc, support, other];
  }

  public getLatestMatchesResults(matches: LOLMatch[], summoner: RIOTSummoner) {
    return matches!.map(match => {
      return match.remake ? 'REMAKE' : this.isMatchWon(match, summoner) ? "VICTORY" : "DEFEAT";
    });
  }

}
