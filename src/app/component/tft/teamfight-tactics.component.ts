import {Component, OnInit} from '@angular/core';
import {RIOTSummonerService} from "../../service/riot/riot-summoner.service";
import {ActivatedRoute} from "@angular/router";
import {RIOTSummoner} from "../../model/riot/riot-summoner.model";
import {RIOTMetadataService} from "../../service/riot/riot-metadata.service";
import {RIOTMetadata} from "../../model/riot/riot-metadata.model";
import {RIOTMatch} from "../../model/riot/riot-match.model";
import {TFTMatch} from "../../model/tft/tft-match.model";
import {RIOTPatchService} from "../../service/riot/riot-patch.service";

@Component({
  selector: 'teamfight-tactics',
  templateUrl: './teamfight-tactics.component.html',
  styleUrls: ['./teamfight-tactics.component.css']
})
export class TeamfightTacticsComponent implements OnInit {

  isThisComponentReady: boolean = true;

  localSummoner: RIOTSummoner | undefined;
  remoteSummoner: RIOTSummoner | undefined;

  protected metadata: RIOTMetadata | undefined;
  protected selectedQueue!: string;
  protected selectedSet!: string;
  protected matches: RIOTMatch[] = [];

  constructor(private summonerService: RIOTSummonerService, private route: ActivatedRoute, private metadataService: RIOTMetadataService, private patchService: RIOTPatchService) {
  }

  async ngOnInit() {
    this.route.params.subscribe(async params => {
      this.isThisComponentReady = false;
      const region: string = params['region'];
      const tag: string = params['tag'];
      const name: string = params['name'];
      this.selectedQueue = params['queue'];
      this.selectedSet = params['set'];
      if (this.localSummoner?.name !== name || this.localSummoner?.region !== region) {
        const [localSummoner, remoteSummoner] = await this.summonerService.getSummoner(region, tag, name, false);
        this.localSummoner = localSummoner;
        this.remoteSummoner = remoteSummoner
        this.metadata = await this.metadataService.getMetadata();
        await this.patchService.checkAndGetNewTFTPatchIfNeeded(this.metadata!.currentPatch)
      }
      this.isThisComponentReady = true;
    });
  }

  get tftMatches() {
    return this.matches as TFTMatch[];
  }
}
