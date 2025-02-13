import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {RIOTSummoner} from "../../../model/riot/riot-summoner.model";
import {HTTPRequestService} from "../../../config/http-request.service";
import {LOLMatch} from "../../../model/lol/lol-match.model";
import {environment} from "../../../../environments/environment";
import {TFTMatch} from "../../../model/tft/tft-match.model";
import {ActivatedRoute} from "@angular/router";
import {RIOTMatch} from "../../../model/riot/riot-match.model";
import {RIOTPatchService} from "../../../service/riot/riot-patch.service";

@Component({
  selector: 'riot-matches',
  templateUrl: './riot-matches.component.html',
  styleUrls: ['./riot-matches.component.css']
})
export class RiotMatchesComponent implements OnChanges {

  @Input() selectedQueue!: string;
  @Input() selectedRole!: string;
  @Input() selectedSet!: string;
  @Input() summoner!: RIOTSummoner;
  @Output() matchesUpdateEvent = new EventEmitter<RIOTMatch[]>();

  constructor(private httpRequestService: HTTPRequestService, private route: ActivatedRoute, private patchService: RIOTPatchService) {
  }

  currentPage!: number;
  matches: RIOTMatch[] = [];
  totalMatchesCount!: number;
  isThisComponentReady!: boolean;
  isLOLMatches!: boolean;

  async ngOnChanges() {
    this.isThisComponentReady = false;
    this.matches = [];
    this.currentPage = 0;
    await this.getMatches();
    await this.setMatchesCount();
    this.isThisComponentReady = true;
  }

  async getMatches() { //TODO empecher de spam
    const moreMatchesButton = document.getElementById('more-matches-button') as HTMLButtonElement;
    const loadingElement = document.getElementById('more-matches-loading-gif') as HTMLImageElement;
    if (moreMatchesButton) moreMatchesButton.disabled = true;
    if (loadingElement) loadingElement.hidden = false;
    let url;
    if (this.route.snapshot.paramMap.get('role')) {
      this.isLOLMatches = true;
      url = `${environment.apiURL}lol/matches/${this.summoner.puuid}/${this.currentPage}/${this.selectedQueue}/${this.selectedRole}`;
      const response = await fetch(url, {headers: HTTPRequestService.getBackendHeaders()});
      const newMatches: LOLMatch[] = await this.httpRequestService.hasResponse(response) ? await response.json() : [];
      for (const newMatch of newMatches) {
        await this.patchService.checkAndGetNewLOLPatchIfNeeded(newMatch.version);
      }
      this.matches = this.matches.concat(newMatches);
    } else {
      this.isLOLMatches = false;
      url = `${environment.apiURL}tft/matches/${this.summoner.puuid}/${this.currentPage}/${this.selectedQueue}/${this.selectedSet.replace('set-', '')}`;
      const response = await fetch(url, {headers: HTTPRequestService.getBackendHeaders()});
      const newMatches: TFTMatch[] = await this.httpRequestService.hasResponse(response) ? await response.json() : [];
      for (const newMatch of newMatches) {
        await this.patchService.checkAndGetNewTFTPatchIfNeeded(newMatch.version);
      }
      this.matches = this.matches.concat(newMatches);
    }
    this.currentPage++;
    if (loadingElement) loadingElement.hidden = true;
    if (moreMatchesButton) moreMatchesButton.disabled = false;
    this.matchesUpdateEvent.emit(this.matches);
  }

  async setMatchesCount() {
    let url;
    if (this.route.snapshot.paramMap.get('role')) {
      url = `${environment.apiURL}lol/matches/count/${this.summoner.puuid}/${this.selectedQueue}/${this.selectedRole}`;
    } else {
      url = `${environment.apiURL}tft/matches/count/${this.summoner.puuid}/${this.selectedQueue}/${this.selectedSet.replace('set-', '')}`;
    }
    const response = await fetch(url, {headers: HTTPRequestService.getBackendHeaders()});
    this.totalMatchesCount = await this.httpRequestService.hasResponse(response) ? await response.json() : 0;
  }

}
