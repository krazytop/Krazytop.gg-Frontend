import {Component, Input, OnChanges} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HTTPRequestService} from "../../../config/http-request.service";
import {TFTRank} from "../../../model/tft/tft-rank.model";
import {RIOTSummoner} from "../../../model/riot/riot-summoner.model";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'tft-ranking',
  templateUrl: './tft-ranking.component.html',
  styleUrls: ['./tft-ranking.component.css']
})
export class TftRankingComponent implements OnChanges {

  @Input() isParentComponentReady: boolean = false;
  @Input() summoner: RIOTSummoner = new RIOTSummoner();

  soloRank!: TFTRank;
  hyperRollRank!: TFTRank;
  doubleUpRank!: TFTRank;

  constructor(private http: HttpClient) {
  }

  ngOnChanges(): void {
    if (this.isParentComponentReady) {
      this.getRank();
      this.getHyperRollRank();
      this.getDoubleUpRank();
    }
  }

  getRank() {
    this.http.get<TFTRank>(environment.apiURL + 'tft/rank/' + this.summoner.id + '/' + "RANKED_TFT", {headers: HTTPRequestService.getBackendHeaders()}).subscribe((response: TFTRank) => {
      this.soloRank = response;
    })
  }

  getHyperRollRank() {
    this.http.get<TFTRank>(environment.apiURL + 'tft/rank/' + this.summoner.id + '/' + "RANKED_TFT_TURBO", {headers: HTTPRequestService.getBackendHeaders()}).subscribe((response: TFTRank) => {
      this.hyperRollRank = response;
    })
  }

  getDoubleUpRank() {
    this.http.get<TFTRank>(environment.apiURL + 'tft/rank/' + this.summoner.id + '/' + "RANKED_TFT_DOUBLE_UP", {headers: HTTPRequestService.getBackendHeaders()}).subscribe((response: TFTRank) => {
      this.doubleUpRank = response;
    })
  }

}
