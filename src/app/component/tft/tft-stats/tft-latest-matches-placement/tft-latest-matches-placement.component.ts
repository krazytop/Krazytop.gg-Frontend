import {Component, Input, OnChanges} from '@angular/core';
import {RIOTSummoner} from "../../../../model/riot/riot-summoner.model";
import {TFTMatch} from "../../../../model/tft/tft-match.model";
import {TFTMatchService} from "../../../../service/tft/tft-match.service";

@Component({
  selector: 'tft-latest-matches-placement',
  templateUrl: './tft-latest-matches-placement.component.html',
  styleUrls: ['./tft-latest-matches-placement.component.css']
})
export class TftLatestMatchesPlacementComponent implements OnChanges {

  @Input() summoner!: RIOTSummoner;
  @Input() matches!: TFTMatch[];

  latestMatchesResults: number[] = [];

  streak: number = 0;

  constructor(protected matchService: TFTMatchService) {
  }

  async ngOnChanges() {
    this.setLatestMatchesResults();
    this.streak = this.matchService.getMatchesStreak(this.matches, this.summoner);
  }

  private setLatestMatchesResults() {
    this.latestMatchesResults = this.matches!.map(match => {
      return this.matchService.getPlacement(match, this.summoner);
    });
  }

  get averagePlacement() {
    const averagePlacement = this.latestMatchesResults.length > 0
      ? this.latestMatchesResults.reduce((acc, num) => acc + num, 0) / this.latestMatchesResults.length
      : 0;
    return averagePlacement % 1 === 0 ? averagePlacement.toFixed(0) : averagePlacement.toFixed(2);
  }

// TODO check EUW1_6183285029 augments qui posent pb
  protected readonly Math = Math;
}
