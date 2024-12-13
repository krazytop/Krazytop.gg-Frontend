import {Component, Input, OnChanges} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RIOTSummoner} from "../../../../model/riot/riot-summoner.model";

@Component({
  selector: 'tft-latest-matches-placement',
  templateUrl: './tft-latest-matches-placement.component.html',
  styleUrls: ['./tft-latest-matches-placement.component.css']
})
export class TftLatestMatchesPlacementComponent implements OnChanges {

  @Input() set!: string;
  @Input() queue!: string;
  @Input() summoner!: RIOTSummoner;

  latestMatchesPlacement: number[] = [];

  constructor(private http: HttpClient) {
  }

  ngOnChanges() {
  }

  getLatestMatchesAveragePlacement(): string {
    let sum = 0;
    for (const placement of this.latestMatchesPlacement) {
      sum += placement;
    }
    return (sum / this.latestMatchesPlacement.length).toFixed(2);
  }

// TODO check EUW1_6183285029 augments qui posent pb
}
