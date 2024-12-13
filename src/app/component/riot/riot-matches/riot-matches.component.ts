import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {RIOTSummoner} from "../../../model/riot/riot-summoner.model";
import {HTTPRequestService} from "../../../config/http-request.service";
import {LOLMatch} from "../../../model/lol/lol-match.model";
import {environment} from "../../../../environments/environment";
import {RIOTImageService} from "../../../service/riot/riot-image.service";
import {TFTMatch} from "../../../model/tft/tft-match.model";
import {ActivatedRoute} from "@angular/router";
import {RIOTMatch} from "../../../model/riot/riot-match.model";

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
  @Output() matchesUpdateEvent = new EventEmitter<RIOTMatch[] | undefined>();

  constructor(private httpRequestService: HTTPRequestService, private imageService: RIOTImageService, private route: ActivatedRoute) {
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
    this.matchesUpdateEvent.emit(undefined);
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
      this.matches = this.matches.concat(newMatches);
    } else {
      this.isLOLMatches = false;
      url = `${environment.apiURL}tft/matches/${this.summoner.puuid}/${this.currentPage}/${this.selectedQueue}/${this.selectedSet.replace('set-', '')}`;
      const response = await fetch(url, {headers: HTTPRequestService.getBackendHeaders()});
      const newMatches: TFTMatch[] = await this.httpRequestService.hasResponse(response) ? await response.json() : [];
      this.matches = this.matches.concat(newMatches);
    }
    this.currentPage++;
    if (loadingElement) loadingElement.hidden = true;
    if (moreMatchesButton) moreMatchesButton.disabled = false;
    if (this.matches.length > 0) {
      this.imageService.setVersion(this.matches[0].version);
    }
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
