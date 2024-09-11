import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HeaderService} from "../../../config/headers.service";
import {TFTMatch} from "../../../model/tft/tft-match.model";
import {TftSearchCriteriaComponent} from "../tft-search-criteria/tft-search-criteria.component";
import {RIOTSummoner} from "../../../model/riot/riot-summoner.model";

@Component({
  selector: 'tft-matches',
  templateUrl: './tft-matches.component.html',
  styleUrls: ['./tft-matches.component.css']
})
export class TftMatchesComponent implements OnChanges {

  @Input() isParentComponentReady: boolean = false;
  @Input() set: string = "";
  @Input() queue: string = "";
  @Input() summoner: RIOTSummoner = new RIOTSummoner();

  matchesPages: TFTMatch[][] = [];
  nextPage: number = 0;
  matchesCount: number = 0;
  pageSize: number = 0;
  isFirstPage: boolean = true;

  private soloQueue: string = "RANKED_TFT";
  private normal: string = "NORMAL_TFT";
  private hyperRoll: string = "RANKED_TFT_TURBO";
  private doubleUp: string = "RANKED_TFT_DOUBLE_UP";

  constructor(private http: HttpClient) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.matchesPages = [];
    this.nextPage = 0;
    this.isFirstPage = true;
    if (this.isParentComponentReady) {
      this.getMatches();
      this.setMatchesCount();
    }
  }

  getMatches() {
    let baseUrl: string = 'http://localhost:8080/tft/matches/' + this.summoner.puuid + '/' + this.nextPage.toString() + '/' + this.set;
    this.http.get<TFTMatch[]>(this.generateUrlWithQueue(baseUrl), {headers: HeaderService.getBackendHeaders(),}).subscribe(response => {
      this.matchesPages.push(response);
      this.nextPage++;
      if (this.isFirstPage) {
        this.pageSize = response.length;
        this.isFirstPage = false;
      }
    })
  }

  setMatchesCount() {
    let baseUrl: string = 'http://localhost:8080/tft/matches/count/' + this.summoner.puuid + '/' + this.set;
    this.http.get<number>(this.generateUrlWithQueue(baseUrl), {headers: HeaderService.getBackendHeaders(),}).subscribe(response => {
      this.matchesCount = response;
    })
  }

  private generateUrlWithQueue(url: string): string {
    if (this.queue === TftSearchCriteriaComponent.soloRanked) {
      url += `/${this.soloQueue}`;
    } else if (this.queue === TftSearchCriteriaComponent.hyperRoll) {
      url += `/${this.hyperRoll}`;
    } else if (this.queue === TftSearchCriteriaComponent.doubleUp) {
      url += `/${this.doubleUp}`;
    } else if (this.queue === TftSearchCriteriaComponent.normal) {
      url += `/${this.normal}`;
    }
    return url;
  }

}
