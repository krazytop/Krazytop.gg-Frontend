import {Component, OnInit} from '@angular/core';
import {RIOTSummoner} from "../../model/riot/riot-summoner.model";
import {RIOTSummonerService} from "../../service/riot/riot-summoner.service";
import {ActivatedRoute} from "@angular/router";
import {RIOTMetadataService} from "../../service/riot/riot-metadata.service";
import {RIOTMetadata} from "../../model/riot/riot-metadata.model";
import {RIOTMatch} from "../../model/riot/riot-match.model";
import {LOLMatch} from "../../model/lol/lol-match.model";
import {RIOTPatchService} from "../../service/riot/riot-patch.service";

@Component({
  selector: 'league-of-legends',
  templateUrl: './league-of-legends.component.html',
  styleUrls: ['./league-of-legends.component.css']
})
export class LeagueOfLegendsComponent implements OnInit {

  isThisComponentReady: boolean = true;

  localSummoner: RIOTSummoner | undefined;
  remoteSummoner: RIOTSummoner | undefined;

  protected selectedQueue!: string;
  protected selectedRole!: string;
  protected matches: RIOTMatch[] = [];
  protected metadata: RIOTMetadata | undefined;

  constructor(private summonerService: RIOTSummonerService, private route: ActivatedRoute, private metadataService: RIOTMetadataService, private patchService: RIOTPatchService) {
  }

  async ngOnInit() {
    this.route.params.subscribe(async params => {
      this.isThisComponentReady = false;
      const region: string = params['region'];
      const tag: string = params['tag'];
      const name: string = params['name'];
      this.selectedQueue = params['queue'];
      this.selectedRole = params['role'];
      if (this.localSummoner?.name !== name || this.localSummoner?.region !== region) {
        const [localSummoner, remoteSummoner] = await this.summonerService.getSummoner(region, tag, name, true);
        this.localSummoner = localSummoner;
        this.remoteSummoner = remoteSummoner
        this.metadata = await this.metadataService.getMetadata();
        await this.patchService.checkAndGetNewLOLPatchIfNeeded(this.metadata!.currentPatch)
      }
      this.isThisComponentReady = true;
    });
  }

  get lolMatches() {
    return this.matches as LOLMatch[];
  }

}
