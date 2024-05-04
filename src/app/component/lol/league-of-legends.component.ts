import {Component, OnInit} from '@angular/core';
import {RIOTSummoner} from "../../model/riot/riot-summoner.model";
import {SummonerService} from "../riot/riot-summoner/summoner.service";
import {GameService} from "../game-list/game.service";
import {ActivatedRoute} from "@angular/router";
import {LOLSearchCriteriaService} from "./lol-search-criteria/lol-search-criteria.service";

@Component({
  selector: 'league-of-legends',
  templateUrl: './league-of-legends.component.html',
  styleUrls: ['./league-of-legends.component.css']
})
export class LeagueOfLegendsComponent implements OnInit {

  isThisComponentReady: boolean = false;

  localSummoner: RIOTSummoner | undefined;
  remoteSummoner: RIOTSummoner | undefined;

  protected readonly LOLSearchCriteriaService = LOLSearchCriteriaService;

  constructor(private summonerService: SummonerService, private gameService: GameService, private searchCriteriaService: LOLSearchCriteriaService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.gameService.initGame("lol");
      const region = params['region'];
      const tag = params['tag'];
      const name = params['name'];
      const queue = params['queue'];
      const role = params['role'];
      this.searchCriteriaService.initQueue(queue);
      this.searchCriteriaService.initRole(role);
      if (this.localSummoner?.name == name && this.localSummoner?.region == region) {
        this.isThisComponentReady = true;
      } else {
        this.remoteSummoner = undefined;
        this.localSummoner = undefined;
        this.summonerService.getLocalSummoner(region, tag, name).subscribe((localSummoner: RIOTSummoner) => {
          if (localSummoner == null) {
            this.summonerService.getRemoteSummoner(region, tag, name).subscribe((remoteSummoner: RIOTSummoner) => {
              if (remoteSummoner != null) {
                this.remoteSummoner = remoteSummoner;
              }
              this.isThisComponentReady = true;
            });
          } else {
            this.localSummoner = localSummoner
            this.isThisComponentReady = true
          }
          this.isThisComponentReady = true;
        });
      }
    });
  }

}
