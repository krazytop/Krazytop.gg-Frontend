import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
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
  @Output() matchesUpdateEvent = new EventEmitter<LOLMatch[] | undefined>();

  constructor(private httpRequestService: HTTPRequestService) {
  }

  currentPage!: number;
  matches: LOLMatch[] = [];
  totalMatchesCount!: number;
  isThisComponentReady!: boolean;

  async ngOnChanges() {
    this.isThisComponentReady = false;
    this.matches = [];
    this.currentPage = 0;
    this.matchesUpdateEvent.emit(undefined);
    await this.getMatches();
    await this.setMatchesCount();
    this.isThisComponentReady = true;
  }

  async getMatches() {
    let url: string = `${environment.apiURL}lol/matches/${this.summoner.puuid}/${this.currentPage}/${this.selectedQueue}/${this.selectedRole}`;
    this.currentPage++;
    const response = await fetch(url, {headers: HTTPRequestService.getBackendHeaders()});
    this.matches = this.matches.concat(await this.httpRequestService.hasResponse(response) ? await response.json() : []);
    this.matchesUpdateEvent.emit(this.matches);
  }

  async setMatchesCount() {
    let url: string = `${environment.apiURL}lol/matches/count/${this.summoner.puuid}/${this.selectedQueue}/${this.selectedRole}`;
    const response = await fetch(url, {headers: HTTPRequestService.getBackendHeaders()});
    this.totalMatchesCount = await this.httpRequestService.hasResponse(response) ? await response.json() : 0;
  }

}
