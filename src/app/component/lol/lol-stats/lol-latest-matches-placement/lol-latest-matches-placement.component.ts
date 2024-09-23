import {Component, Input, OnChanges} from '@angular/core';
import {RIOTSummoner} from "../../../../model/riot/riot-summoner.model";
import {HttpClient} from "@angular/common/http";
import {HTTPRequestService} from "../../../../config/http-request.service";
import {LolSearchCriteriaComponent} from "../../lol-search-criteria/lol-search-criteria.component";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'lol-latest-matches-placement',
  templateUrl: './lol-latest-matches-placement.component.html',
  styleUrls: ['./lol-latest-matches-placement.component.css']
})
export class LolLatestMatchesPlacementComponent implements OnChanges {

  @Input() queue: string = "";
  @Input() role: string = "";
  @Input() summoner: RIOTSummoner = new RIOTSummoner();

  latestMatchesResults: string[] = [];

  private allQueues: string = "ALL_QUEUES";
  private normal: string = "DRAFT";
  private quickPlay: string = "QUICKPLAY";
  private soloRanked: string = "SOLO_RANKED";
  private flexRanked: string = "FLEX_RANKED";
  private aram: string = "ARAM";

  private allRoles: string = 'ALL_ROLES';
  private top: string = 'TOP';
  private jungle: string = 'JUNGLE';
  private middle: string = 'MIDDLE';
  private bottom: string = 'BOTTOM';
  private support: string = 'UTILITY';

  streak: number = 0;

  constructor(private http: HttpClient) {
  }

  ngOnChanges() {
    this.getLatestMatchesResults();
  }

  getLatestMatchesResults() {
    let url: string = environment.apiURL + 'lol/stats/latest-matches-placement/' + this.summoner.puuid;
    if (this.queue === LolSearchCriteriaComponent.soloRanked) {
      url += `/${this.soloRanked}`;
    } else if (this.queue === LolSearchCriteriaComponent.flexRanked) {
      url += `/${this.flexRanked}`;
    } else if (this.queue === LolSearchCriteriaComponent.normal) {
      url += `/${this.normal}`;
    } else if (this.queue === LolSearchCriteriaComponent.aram) {
      url += `/${this.aram}`;
    } else if (this.queue === LolSearchCriteriaComponent.quickPlay) {
      url += `/${this.quickPlay}`;
    } else if (this.queue === LolSearchCriteriaComponent.allQueues) {
      url += `/${this.allQueues}`;
    }
    if (this.role === LolSearchCriteriaComponent.top) {
      url += `/${this.top}`;
    } else if (this.role === LolSearchCriteriaComponent.jungle) {
      url += `/${this.jungle}`;
    } else if (this.role === LolSearchCriteriaComponent.middle) {
      url += `/${this.middle}`;
    } else if (this.role === LolSearchCriteriaComponent.bottom) {
      url += `/${this.bottom}`;
    } else if (this.role === LolSearchCriteriaComponent.support) {
      url += `/${this.support}`;
    } else if (this.role === LolSearchCriteriaComponent.allRoles) {
      url += `/${this.allRoles}`;
    }
    this.http.get<string[]>(url, {headers: HTTPRequestService.getBackendHeaders(),}).subscribe(response => {
      this.latestMatchesResults = response;
      this.setStreak();
    })
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
    return (victories / nbMatches * 100).toFixed(1);
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
