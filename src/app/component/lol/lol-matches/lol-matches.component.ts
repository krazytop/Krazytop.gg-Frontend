import {Component, Input, OnChanges} from '@angular/core';
import {RIOTSummoner} from "../../../model/riot/riot-summoner.model";
import {HTTPRequestService} from "../../../config/http-request.service";
import {LOLMatch} from "../../../model/lol/lol-match.model";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'lol-matches',
  templateUrl: './lol-matches.component.html',
  styleUrls: ['./lol-matches.component.css']
})
export class LolMatchesComponent implements OnChanges {

  @Input() selectedQueue!: string;
  @Input() selectedRole!: string;
  @Input() summoner: RIOTSummoner = new RIOTSummoner();

  constructor(private httpRequestService: HTTPRequestService) {
  }

  matchesPages: LOLMatch[][] = [];
  totalMatchesCount!: number;
  isThisComponentReady!: boolean;

  async ngOnChanges() {
    this.isThisComponentReady = false;
    this.matchesPages = [];
    await this.getMatches();
    await this.setMatchesCount();
    this.isThisComponentReady = true;
  }

  async getMatches() {
    let url: string = `${environment.apiURL}lol/matches/${this.summoner.puuid}/${this.matchesPages.length}/${this.selectedQueue}/${this.selectedRole}`;
    const response = await fetch(url, {headers: HTTPRequestService.getBackendHeaders()});
    this.matchesPages.push(await this.httpRequestService.hasResponse(response) ? await response.json() : []);
  }

  async setMatchesCount() {
    let url: string = `${environment.apiURL}lol/matches/count/${this.summoner.puuid}/${this.selectedQueue}/${this.selectedRole}`;
    const response = await fetch(url, {headers: HTTPRequestService.getBackendHeaders()});
    this.totalMatchesCount = await this.httpRequestService.hasResponse(response) ? await response.json() : 0;
  }

  hasMoreMatches() {
    return this.matchesPages.reduce((total, page) => total + page.length, 0) < this.totalMatchesCount;
  }

}
