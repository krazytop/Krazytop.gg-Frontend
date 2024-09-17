import {Component, OnInit} from '@angular/core';
import {SummonerService} from "../riot/riot-summoner/summoner.service";
import {ActivatedRoute} from "@angular/router";
import {TftSearchCriteriaService} from "./tft-search-criteria/tft-search-criteria.service";
import {RIOTSummoner} from "../../model/riot/riot-summoner.model";

@Component({
  selector: 'teamfight-tactics',
  templateUrl: './teamfight-tactics.component.html',
  styleUrls: ['./teamfight-tactics.component.css']
})

export class TeamfightTacticsComponent implements OnInit {

  isThisComponentReady: boolean = true;

  localSummoner: RIOTSummoner | undefined;
  remoteSummoner: RIOTSummoner | undefined;

  protected readonly TftSearchCriteriaService = TftSearchCriteriaService;

  constructor(private summonerService: SummonerService, private searchCriteriaService: TftSearchCriteriaService, private route: ActivatedRoute) {
  }

  async ngOnInit() {
    let region = "";
    let tag = "";
    let name = "";
    let queue = "";
    let set = "";
    this.isThisComponentReady = false;
    this.route.params.subscribe(params => {
      region = params['region'];
      tag = params['tag'];
      name = params['name'];
      queue = params['queue'];
      set = params['role'];
    });
    this.searchCriteriaService.initQueue(queue);
    this.searchCriteriaService.initSet(set);
    if (this.localSummoner?.name != name || this.localSummoner?.region != region) {
      const [localSummoner, remoteSummoner] = await this.summonerService.getSummoner(region, tag, name);
      this.localSummoner = localSummoner;
      this.remoteSummoner = remoteSummoner
    }
    this.isThisComponentReady = true;
  }
}
