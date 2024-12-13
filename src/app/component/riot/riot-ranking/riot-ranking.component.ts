import {Component, Input, OnChanges} from '@angular/core';
import {RIOTSummoner} from "../../../model/riot/riot-summoner.model";
import {HTTPRequestService} from "../../../config/http-request.service";
import {RIOTRank, RIOTRankInformations, RanksJson} from "../../../model/riot/riot-rank.model";
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

  allRanks?: Map<number, Map<string, RIOTRankInformations[]>>;
  currentSeasonOrSet!: number;

  async ngOnChanges() {
    if (this.metadata) {
      await this.getRanks();
      if (this.route.snapshot.paramMap.get('role')) {
        this.currentSeasonOrSet = this.metadata.currentLOLSeason;
        this.metadata.ranks = this.metadata.ranks.filter(rank => rank.isLOL);
      } else {
        this.currentSeasonOrSet = this.metadata.currentTFTSet;
        this.metadata.ranks = this.metadata.ranks.filter(rank => !rank.isLOL);
      }
    }
  }

  async getRanks() {
    const response = await fetch(`${environment.apiURL}lol/rank/${this.summoner.puuid}`, {headers: HTTPRequestService.getBackendHeaders(),});
    const rank: RIOTRank | undefined = await this.httpRequestService.hasResponse(response) ? await response.json() : undefined;
    if (rank) {
      this.allRanks = this.getMap(rank.ranks);
    }
  }

  getMap(ranks: RanksJson): Map<number, Map<string, RIOTRankInformations[]>> {
    const seasonOrSetMap = new Map<number, Map<string, RIOTRankInformations[]>>();

    Object.entries(ranks).forEach(([seasonOrSet, queues]) => {
      const queueMap = new Map<string, RIOTRankInformations[]>();

      Object.entries(queues).forEach(([queueType, rankInfoList]) => {
        queueMap.set(queueType, rankInfoList);
      });

      seasonOrSetMap.set(Number(seasonOrSet), queueMap);
    });
    return seasonOrSetMap;
  }

}
