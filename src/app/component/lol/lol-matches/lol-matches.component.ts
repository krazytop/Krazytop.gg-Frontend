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

  matchesPages: LOLMatch[][] = [];
  nextPage!: number;
  matchesCount!: number;
  pageSize: number = 5;
  isFirstPage: boolean = true;

  async ngOnChanges() {
    this.matchesPages = [];
    this.nextPage = 0;
    this.isFirstPage = true;
    await this.getMatches();
    await this.setMatchesCount();
    console.log(this.matchesCount)
  }

  async getMatches() {
    let url: string = `${environment.apiURL}lol/matches/${this.summoner.puuid}/${this.nextPage}/${this.selectedQueue}/${this.selectedRole}`;
    const response = await fetch(url, {headers: HTTPRequestService.getBackendHeaders()});
    this.matchesPages.push(await response.json());
    this.nextPage++;
    if (this.isFirstPage) {
      this.pageSize = this.matchesPages.length;
      this.isFirstPage = false;
    }
  }

  async setMatchesCount() {
    let url: string = `${environment.apiURL}lol/matches/count/${this.summoner.puuid}/${this.selectedQueue}/${this.selectedRole}`;
    const response = await fetch(url, {headers: HTTPRequestService.getBackendHeaders()});
    this.matchesCount = await response.json();
  }

}
