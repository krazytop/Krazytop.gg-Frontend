import {Component, OnInit} from '@angular/core';
import {RIOTSummonerService} from "../../service/riot/riot-summoner.service";
import {ActivatedRoute} from "@angular/router";
import {RIOTSummoner} from "../../model/riot/riot-summoner.model";
import {RIOTMetadataService} from "../../service/riot/riot-metadata.service";
import {RIOTMetadata} from "../../model/riot/riot-metadata.model";
import {RIOTMatch} from "../../model/riot/riot-match.model";
import {TFTMatch} from "../../model/tft/tft-match.model";

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
  private region!: string;
  private tag!: string;
  private name!: string;
  protected selectedQueue!: string;
  protected selectedSet!: string;
  protected matches: RIOTMatch[] = [];

  constructor(private summonerService: RIOTSummonerService, private route: ActivatedRoute, private metadataService: RIOTMetadataService) {
  }

  async ngOnInit() {
    this.route.params.subscribe(async params => {
      this.isThisComponentReady = false;
      this.region = params['region'];
      this.tag = params['tag'];
      this.name = params['name'];
      this.selectedQueue = params['queue'];
      this.selectedSet = params['set'];
      if (this.localSummoner?.name !== this.name || this.localSummoner?.region !== this.region) {
        const [localSummoner, remoteSummoner] = await this.summonerService.getSummoner(this.region, this.tag, this.name);
        this.localSummoner = localSummoner;
        this.remoteSummoner = remoteSummoner
        this.metadata = await this.metadataService.getMetadata();
      }
      this.isThisComponentReady = true;
    });
  }

  get tftMatches() {
    return this.matches as TFTMatch[];
  }
}
