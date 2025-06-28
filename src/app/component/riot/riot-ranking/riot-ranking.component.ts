import {Component, Input, OnChanges} from '@angular/core';
import {RIOTSummoner} from "../../../model/riot/riot-summoner.model";
import {RIOTRank} from "../../../model/riot/riot-rank.model";
import {RIOTMetadata} from "../../../model/riot/riot-metadata.model";
import {ActivatedRoute} from "@angular/router";
import {RIOTRankService} from "../../../service/riot/riot-rank.service";
import {TFTAvailableRanks} from "../../../model/tft/tft-available-ranks";
import {LOLAvailableRanks} from "../../../model/lol/lol-available-ranks";

@Component({
  selector: 'riot-ranking',
  templateUrl: './riot-ranking.component.html',
  styleUrls: ['./riot-ranking.component.css']
})
export class RiotRankingComponent implements OnChanges {

  @Input() summoner!: RIOTSummoner;
  @Input() metadata!: RIOTMetadata;
  allRanksIds : string[] = [];

  constructor(private route: ActivatedRoute, protected rankService: RIOTRankService) {
  }

  allRanks?: RIOTRank;
  currentSeasonOrSet!: number;

  async ngOnChanges() {
    if (this.metadata) {
      const isLOL = !!this.route.snapshot.paramMap.get('role');
      this.currentSeasonOrSet = this.metadata.currentSeasonOrSet;
      this.allRanksIds = isLOL ? Object.values(LOLAvailableRanks) : Object.values(TFTAvailableRanks);
      this.allRanks = await this.rankService.getRanks(this.summoner.puuid, isLOL);
      console.log(this.allRanks);
    }
  }

}
