import {Injectable} from "@angular/core";
import {LOLMatch} from "../../model/lol/lol-match.model";
import {RIOTSummoner} from "../../model/riot/riot-summoner.model";

@Injectable({
  providedIn: 'root',
})
export class LOLMatchService {

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
    let victories = 0;
    let defeats = 0;
    matches.filter(match => !match.remake)
      .forEach(match => {
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
