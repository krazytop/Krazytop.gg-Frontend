import {Component, Input, OnChanges} from '@angular/core';
import {RIOTSummoner} from "../../../model/riot/riot-summoner.model";
import {HttpClient} from "@angular/common/http";
import {HeaderService} from "../../../config/headers.service";
import {LOLMatch} from "../../../model/lol/lol-match.model";
import {LolSearchCriteriaComponent} from "../lol-search-criteria/lol-search-criteria.component";
import {environment} from "../../../../environments/environment";
import {LOLSearchCriteriaService} from "../lol-search-criteria/lol-search-criteria.service";

@Component({
  selector: 'lol-matches',
  templateUrl: './lol-matches.component.html',
  styleUrls: ['./lol-matches.component.css']
})
export class LolMatchesComponent implements OnChanges {

  @Input() queue: string = "";
  @Input() role: string = "";
  @Input() summoner: RIOTSummoner = new RIOTSummoner();

  matchesPages: LOLMatch[][] = [];
  nextPage: number = 0;
  matchesCount: number = 0;
  pageSize: number = 0;
  isFirstPage: boolean = true;

  constructor(private searchCriteriaService: LOLSearchCriteriaService) {
  }

  async ngOnChanges() {
    this.matchesPages = [];
    this.nextPage = 0;
    this.isFirstPage = true;
    await this.getMatches();
    await this.setMatchesCount();
  }

  async getMatches() {
    let url: string = `${environment.apiURL}lol/matches/${this.summoner.puuid}/${this.nextPage}/${this.searchCriteriaService.getFormattedQueue(this.queue)}/${this.searchCriteriaService.getFormattedRole(this.role)}`;
    const response = await fetch(url, {headers: HeaderService.getBackendHeaders()});
    this.matchesPages.push(await response.json());
    this.nextPage++;
    if (this.isFirstPage) {
      this.pageSize = this.matchesPages.length;
      this.isFirstPage = false;
    }
  }

  async setMatchesCount() {
    let url: string = `${environment.apiURL}lol/matches/count/${this.summoner.puuid}/${this.searchCriteriaService.getFormattedQueue(this.queue)}/${this.searchCriteriaService.getFormattedRole(this.role)}`;
    const response = await fetch(url, {headers: HeaderService.getBackendHeaders()});
    this.matchesCount = await response.json();
  }

}
