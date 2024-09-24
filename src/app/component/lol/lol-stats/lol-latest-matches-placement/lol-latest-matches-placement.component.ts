import {Component, Input, OnChanges} from '@angular/core';
import {RIOTSummoner} from "../../../../model/riot/riot-summoner.model";
import {HTTPRequestService} from "../../../../config/http-request.service";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'lol-latest-matches-placement',
  templateUrl: './lol-latest-matches-placement.component.html',
  styleUrls: ['./lol-latest-matches-placement.component.css']
})
export class LolLatestMatchesPlacementComponent implements OnChanges {

  @Input() selectedQueue!: string;
  @Input() selectedRole!: string;
  @Input() summoner: RIOTSummoner = new RIOTSummoner();

  latestMatchesResults: string[] = [];

  streak: number = 0;
  isThisComponentReady!: boolean;

  constructor() {
  }

  async ngOnChanges() {
    this.isThisComponentReady = false;
    await this.getLatestMatchesResults();
    this.isThisComponentReady = true;
  }

  async getLatestMatchesResults() {
    let url: string = `${environment.apiURL}lol/stats/latest-matches-placement/${this.summoner.puuid}/${this.selectedQueue}/${this.selectedRole}`;
    const response = await fetch(url, {headers: HTTPRequestService.getBackendHeaders()});
    this.latestMatchesResults = await response.json();
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

  setStreak() {
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
