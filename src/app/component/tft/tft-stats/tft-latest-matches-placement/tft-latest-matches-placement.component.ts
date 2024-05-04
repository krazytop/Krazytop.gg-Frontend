import {Component, Input, OnChanges} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HeaderService} from "../../../../config/headers.service";
import {TftSearchCriteriaComponent} from "../../tft-search-criteria/tft-search-criteria.component";
import {RIOTSummoner} from "../../../../model/riot/riot-summoner.model";

@Component({
  selector: 'tft-latest-matches-placement',
  templateUrl: './tft-latest-matches-placement.component.html',
  styleUrls: ['./tft-latest-matches-placement.component.css']
})
export class TftLatestMatchesPlacementComponent implements OnChanges {

  @Input() isParentComponentReady: boolean = false;
  @Input() set: string = "";
  @Input() queue: string = "";
  @Input() summoner: RIOTSummoner = new RIOTSummoner();

  latestMatchesPlacement: number[] = [];

  private soloQueue: string = "RANKED_TFT";
  private hyperRoll: string = "RANKED_TFT_TURBO";
  private doubleUp: string = "RANKED_TFT_DOUBLE_UP";
  private normal: string = "NORMAL_TFT";

  constructor(private http: HttpClient) {
  }

  ngOnChanges() {
    if (this.isParentComponentReady) {
      this.getLatestMatchesPlacement();
    }
  }

  getLatestMatchesPlacement() {
    let url: string = 'http://localhost:8080/tft/stats/latest-matches-placement/' + this.summoner.puuid + '/' + this.set;
    if (this.queue == TftSearchCriteriaComponent.soloRanked) {
      url += `/${(this.soloQueue)}`
    } else if (this.queue == TftSearchCriteriaComponent.hyperRoll) {
      url += `/${(this.hyperRoll)}`
    } else if (this.queue == TftSearchCriteriaComponent.doubleUp) {
      url += `/${(this.doubleUp)}`
    } else if (this.queue == TftSearchCriteriaComponent.normal) {
      url += `/${(this.normal)}`
    }
    this.http.get<number[]>(url, {headers: HeaderService.getHeaders(),}).subscribe(response => {
      this.latestMatchesPlacement = response;
    })
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
