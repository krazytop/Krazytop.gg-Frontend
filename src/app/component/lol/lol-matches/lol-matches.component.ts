import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {RIOTSummoner} from "../../../model/riot/riot-summoner.model";
import {HttpClient} from "@angular/common/http";
import {HeaderService} from "../../../config/headers.service";
import {LOLMatch} from "../../../model/lol/lol-match.model";
import {LolSearchCriteriaComponent} from "../lol-search-criteria/lol-search-criteria.component";

@Component({
  selector: 'lol-matches',
  templateUrl: './lol-matches.component.html',
  styleUrls: ['./lol-matches.component.css']
})
export class LolMatchesComponent implements OnChanges {

  @Input() isParentComponentReady: boolean = false;
  @Input() queue: string = "";
  @Input() role: string = "";
  @Input() summoner: RIOTSummoner = new RIOTSummoner();

  matchesPages: LOLMatch[][] = [];
  nextPage: number = 0;
  matchesCount: number = 0;
  pageSize: number = 0;
  isFirstPage: boolean = true;

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
    let baseUrl: string = 'http://localhost:8080/lol/matches/' + this.summoner.puuid + '/' + this.nextPage.toString();
    this.http.get<LOLMatch[]>(this.generateUrlWithRole(this.generateUrlWithQueue(baseUrl)), {headers: HeaderService.getBackendHeaders(),}).subscribe(response => {
      this.matchesPages.push(response);
      this.nextPage++;
      if (this.isFirstPage) {
        this.pageSize = response.length;
        this.isFirstPage = false;
      }
    })
  }

  setMatchesCount() {
    let baseUrl: string = 'http://localhost:8080/lol/matches/count/' + this.summoner.puuid;
    this.http.get<number>(this.generateUrlWithRole(this.generateUrlWithQueue(baseUrl)), {headers: HeaderService.getBackendHeaders(),}).subscribe(response => {
      this.matchesCount = response;
    })
  }

  generateUrlWithQueue(url: string): string {
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
    return url;
  }

  generateUrlWithRole(url: string): string {
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
    return url;
  }

}
