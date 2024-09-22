import {Component, OnInit} from '@angular/core';
import {RIOTSummoner} from "../../model/riot/riot-summoner.model";
import {SummonerService} from "../riot/riot-summoner/summoner.service";
import {ActivatedRoute} from "@angular/router";
import {LOLSearchCriteriaService} from "./lol-search-criteria/lol-search-criteria.service";

@Component({
  selector: 'league-of-legends',
  templateUrl: './league-of-legends.component.html',
  styleUrls: ['./league-of-legends.component.css']
})
export class LeagueOfLegendsComponent implements OnInit {

  isThisComponentReady: boolean = true;

  localSummoner: RIOTSummoner | undefined;
  remoteSummoner: RIOTSummoner | undefined;

  protected readonly LOLSearchCriteriaService = LOLSearchCriteriaService;

  constructor(private summonerService: SummonerService, private searchCriteriaService: LOLSearchCriteriaService, private route: ActivatedRoute) {
  }

  async ngOnInit() {
    console.log("a")
    let region = "";
    let tag = "";
    let name = "";
    let queue = "";
    let role = "";
    this.isThisComponentReady = false;
    this.route.params.subscribe(params => {
      region = params['region'];
      tag = params['tag'];
      name = params['name'];
      queue = params['queue'];
      role = params['role'];
    });
    this.searchCriteriaService.initQueue(queue);
    this.searchCriteriaService.initRole(role);
    if (this.localSummoner?.name != name || this.localSummoner?.region != region) {
      const [localSummoner, remoteSummoner] = await this.summonerService.getSummoner(region, tag, name);
      this.localSummoner = localSummoner;
      this.remoteSummoner = remoteSummoner
    }
    this.isThisComponentReady = true;
  }

}
