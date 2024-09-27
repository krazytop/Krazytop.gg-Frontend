import {Component, Input, OnChanges} from '@angular/core';
import {RIOTSummoner} from "../../../../model/riot/riot-summoner.model";
import {LOLMatch} from "../../../../model/lol/lol-match.model";
import {LOLMatchService} from "../../../../service/lol/lol-match.service";

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

  constructor(protected matchService: LOLMatchService) {
  }

  async ngOnChanges() {
    if (this.matches) {
      this.setLatestMatchesResults();
      this.streak = this.matchService.getMatchesStreak(this.matches, this.summoner);
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
  }

  protected readonly Math = Math;
}
