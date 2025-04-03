import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {RIOTSummoner} from "../../../model/riot/riot-summoner.model";
import {HTTPRequestService} from "../../../config/http-request.service";
import {LOLMatch} from "../../../model/lol/lol-match.model";
import {environment} from "../../../../environments/environment";
import {TFTMatch} from "../../../model/tft/tft-match.model";
import {ActivatedRoute} from "@angular/router";
import {RIOTMatch} from "../../../model/riot/riot-match.model";
import {RIOTPatchService} from "../../../service/riot/riot-patch.service";
import {LOLMatchService} from "../../../service/lol/lol-match.service";
import {TFTMatchService} from "../../../service/tft/tft-match.service";

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

  constructor(private route: ActivatedRoute, private patchService: RIOTPatchService, private lolMatchService: LOLMatchService, private tftMatchService: TFTMatchService) {
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
    if (this.route.snapshot.paramMap.get('role')) {
      this.isLOLMatches = true;
      const newMatches: LOLMatch[] = await this.lolMatchService.getMatches(this.summoner.id, this.currentPage, this.selectedQueue, this.selectedRole);
      for (const newMatch of newMatches) {
        await this.patchService.checkAndGetNewLOLPatchIfNeeded(newMatch.version);
      }
      this.matches = this.matches.concat(newMatches);
    } else {
      this.isLOLMatches = false;
      const newMatches: TFTMatch[] = await this.tftMatchService.getMatches(this.summoner.id, this.currentPage, this.selectedQueue, Number(this.selectedSet.replace('set-', '')));
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
    this.totalMatchesCount = this.isLOLMatches ?
      await this.lolMatchService.getMatchesCount(this.summoner.id, this.selectedQueue, this.selectedRole)
      : await this.tftMatchService.getMatchesCount(this.summoner.id, this.selectedQueue, Number(this.selectedSet.replace('set-', '')))
  }

}
