import {Component, Input, OnChanges} from '@angular/core';
import {RIOTSummoner} from "../../../../model/riot/riot-summoner.model";
import {LOLMatch} from "../../../../model/lol/lol-match.model";

@Component({
  selector: 'lol-latest-matches-placement',
  templateUrl: './lol-latest-matches-placement.component.html',
  styleUrls: ['./lol-latest-matches-placement.component.css']
})
export class LolLatestMatchesPlacementComponent implements OnChanges {

  @Input() summoner: RIOTSummoner = new RIOTSummoner();
  @Input() matches: LOLMatch[] | undefined;

  latestMatchesResults: string[] = [];

  streak: number = 0;

  async ngOnChanges() {
    if (this.matches) {
      this.setLatestMatchesResults();
    }
  }

  private setLatestMatchesResults() {
    this.latestMatchesResults = this.matches!.map(match => {
      if (match.remake) {
        return 'REMAKE';
      }
      const summonerTeam = match.teams.find(team => team.participants.some(p => p.summoner.puuid === this.summoner.puuid))!;
      return summonerTeam.hasWin ? "VICTORY" : "DEFEAT";
    });

    this.setStreak();
  }

  getLatestMatchesWinRate(): string {
    let victories = 0;
    let nbMatches = 0;
    for (const result of this.latestMatchesResults) {
      if (result !== "REMAKE") {
        nbMatches ++;
      }
      if (result === "VICTORY") {
        victories ++;
      }
    }
    const winRate =  victories / nbMatches * 100;
    return winRate % 1 === 0 ? winRate.toFixed(0) : winRate.toFixed(1);
  }

  private setStreak() {
    let currentStreak = 0;
    let lastResult: string | null = null;

    for (const element of this.latestMatchesResults) {
      const result = element;
      if (result === 'REMAKE') {
        continue;
      }
      if (lastResult === null || lastResult === result) {
        currentStreak++;
      } else {
        break;
      }
      lastResult = result;
    }
    this.streak = (lastResult === 'VICTORY') ? currentStreak : -currentStreak;
  }

  protected readonly Math = Math;
}
