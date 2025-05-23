import {Component, Input, OnChanges} from '@angular/core';
import {RIOTSummoner} from "../../../../model/riot/riot-summoner.model";
import {LOLMatch} from "../../../../model/lol/lol-match.model";
import {LOLMatchService} from "../../../../service/lol/lol-match.service";
import {RIOTMatch} from "../../../../model/riot/riot-match.model";

@Component({
  selector: 'lol-latest-matches-placement',
  templateUrl: './lol-latest-matches-placement.component.html',
  styleUrls: ['./lol-latest-matches-placement.component.css']
})
export class LolLatestMatchesPlacementComponent implements OnChanges {

  @Input() summoner!: RIOTSummoner;
  @Input({transform: (matches: RIOTMatch[]): LOLMatch[] => matches as LOLMatch[]}) matches!: LOLMatch[];

  latestMatchesResults: string[] = [];
  wins: number = 0;
  looses: number = 0;

  streak: number = 0;
  winRate: string = '';

  constructor(protected matchService: LOLMatchService) {
  }

  async ngOnChanges() {
    this.latestMatchesResults = this.matchService.getLatestMatchesResults(this.matches, this.summoner);
    this.setWinsNumber();
    this.setLoosesNumber();
    this.winRate = this.matchService.getWinRate(this.matches, this.summoner);
    this.streak = this.matchService.getMatchesStreak(this.matches, this.summoner);
  }

  protected setWinsNumber() {
    this.wins = this.matches!
      .filter(match => !match.remake)
      .filter(match => this.matchService.isMatchWon(match, this.summoner))
      .length;
  }

  protected setLoosesNumber() {
    this.looses = this.matches!
      .filter(match => !match.remake)
      .filter(match => !this.matchService.isMatchWon(match, this.summoner))
      .length;
  }

  protected readonly Math = Math;
}
