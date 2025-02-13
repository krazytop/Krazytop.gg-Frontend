import {Component, Input, OnChanges} from '@angular/core';
import {RIOTSummoner} from "../../../model/riot/riot-summoner.model";
import {HTTPRequestService} from "../../../config/http-request.service";
import {RIOTRank} from "../../../model/riot/riot-rank.model";
import {environment} from "../../../../environments/environment";
import {RIOTMetadata} from "../../../model/riot/riot-metadata.model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'riot-ranking',
  templateUrl: './riot-ranking.component.html',
  styleUrls: ['./riot-ranking.component.css']
})
export class RiotRankingComponent implements OnChanges {

  @Input() summoner!: RIOTSummoner;
  @Input() metadata!: RIOTMetadata;

  constructor(private httpRequestService: HTTPRequestService, private route: ActivatedRoute) {
  }

  allRanks?: RIOTRank;
  currentSeasonOrSet!: number;

  async ngOnChanges() {
    if (this.metadata) {
      const isLOL = !!this.route.snapshot.paramMap.get('role');
      this.currentSeasonOrSet = isLOL ? this.metadata.currentLOLSeason : this.metadata.currentTFTSet;
      this.metadata.allRanks = this.metadata.allRanks.filter(rank => isLOL ? rank.isLOL : !rank.isLOL);
      await this.getRanks(isLOL);
    }
  }

  async getRanks(isLOL: boolean) {
    const response = await fetch(`${environment.apiURL}${isLOL ? 'lol' : 'tft'}/ranks/${this.summoner.puuid}`, {headers: HTTPRequestService.getBackendHeaders(),});
    this.allRanks = await this.httpRequestService.hasResponse(response) ? await response.json() : undefined;
  }

  getRank(queueRankId: string) {
    return this.allRanks?.seasonOrSetRanks
      .find(seasonOrSetRank => seasonOrSetRank.nb === this.currentSeasonOrSet)?.queueRanks
      .find(queueRank => queueRank.name === queueRankId);
  }

}
