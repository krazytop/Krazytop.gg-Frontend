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

  private region!: string;
  private tag!: string;
  private name!: string;
  private queue!: string;
  private role!: string;

  protected readonly LOLSearchCriteriaService = LOLSearchCriteriaService;

  constructor(private summonerService: SummonerService, private searchCriteriaService: LOLSearchCriteriaService, private route: ActivatedRoute) {
  }

  async ngOnInit() {
    this.route.params.subscribe(async params => {
      this.isThisComponentReady = false;
      this.region = params['region'];
      this.tag = params['tag'];
      this.name = params['name'];
      this.queue = params['queue'];
      this.role = params['role'];
      this.searchCriteriaService.initQueue(this.queue);
      this.searchCriteriaService.initRole(this.role);
      if (this.localSummoner?.name != this.name || this.localSummoner?.region != this.region) {
        const [localSummoner, remoteSummoner] = await this.summonerService.getSummoner(this.region, this.tag, this.name);
        this.localSummoner = localSummoner;
        this.remoteSummoner = remoteSummoner
      }
      this.isThisComponentReady = true;
    });
  }

}
