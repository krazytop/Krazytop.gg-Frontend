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
    return this.getSummonerParticipant(match, summoner).hasWin;
  }

  public getSummonerParticipant(match: TFTMatch, summoner: RIOTSummoner) {
    return match.participants.find(participant => participant.summoner.puuid === summoner.puuid)!;
  }

  public getPlacement(match: TFTMatch, summoner: RIOTSummoner) {
    return this.getSummonerParticipant(match, summoner).placement;
  }

}
