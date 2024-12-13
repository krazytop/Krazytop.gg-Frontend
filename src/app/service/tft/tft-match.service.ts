import {Injectable} from "@angular/core";
import {RIOTSummoner} from "../../model/riot/riot-summoner.model";
import {TFTMatch} from "../../model/tft/tft-match.model";

@Injectable({
  providedIn: 'root',
})
export class TFTMatchService {

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
    return this.getSummonerParticipant(match, summoner).win;
  }
/**
  public getSummonerTeam(match: LOLMatch, summoner: RIOTSummoner) {
    return match.teams.find(team => team.participants.some(p => p.summoner.puuid === summoner.puuid))!;
  }
**/
  public getSummonerParticipant(match: TFTMatch, summoner: RIOTSummoner) {
    return match.participants.find(participant => participant.summoner.puuid === summoner.puuid)!;
  }

  public getWinRate(matches: TFTMatch[], summoner: RIOTSummoner) {
    let victories = 0;
    let defeats = 0;
    matches.forEach(match => {
      if (this.isMatchWon(match, summoner)) {
        victories++;
      } else {
        defeats++;
      }
    });
    const winRate =  victories / (victories + defeats) * 100;
    return winRate % 1 === 0 ? winRate.toFixed(0) : winRate.toFixed(1);
  }

}
