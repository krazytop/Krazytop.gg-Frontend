import {Component, OnInit} from '@angular/core';
import {RIOTSummoner} from "../../model/riot/riot-summoner.model";
import {RIOTSummonerService} from "../../service/riot/riot-summoner.service";
import {ActivatedRoute} from "@angular/router";
import {RIOTMetadataService} from "../../service/riot/riot-metadata.service";
import {RIOTMetadata} from "../../model/riot/riot-metadata.model";
import {RIOTMatch} from "../../model/riot/riot-match.model";
import {RIOTPatchService} from "../../service/riot/riot-patch.service";

@Component({
  selector: 'league-of-legends',
  templateUrl: './league-of-legends.component.html',
  styleUrls: ['./league-of-legends.component.css']
})
export class LeagueOfLegendsComponent implements OnInit {

  isThisComponentReady: boolean = true;

  summoner?: RIOTSummoner;

  protected selectedQueue!: string;
  protected selectedRole!: string;
  protected matches: RIOTMatch[] = [];
  protected metadata: RIOTMetadata | undefined;

  constructor(private summonerService: RIOTSummonerService, private route: ActivatedRoute, private metadataService: RIOTMetadataService, private patchService: RIOTPatchService) {
  }

  async ngOnInit() {
    this.route.params.subscribe(async params => {
      this.isThisComponentReady = false;
      const tag: string = params['tag'];
      const name: string = params['name'];
      this.selectedQueue = params['queue'];
      this.selectedRole = params['role'];
      this.matches = [];
      if (this.summoner?.name !== name) {//TODO voir à quoi ça sert ? (sans doute à ne pas re récupérer le summoner
        this.summoner = await this.summonerService.getSummonerByNameAndTag(tag, name, true);
        this.metadata = await this.metadataService.getLOLMetadata();
        await this.patchService.checkAndGetNewLOLPatchIfNeeded(this.metadata!.currentPatch);
      }
      this.isThisComponentReady = true;
    });
  }

}
