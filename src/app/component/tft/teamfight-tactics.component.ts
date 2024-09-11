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

  isThisComponentReady: boolean = false;

  localSummoner: RIOTSummoner | undefined;
  remoteSummoner: RIOTSummoner | undefined;

  protected readonly TftSearchCriteriaService = TftSearchCriteriaService;

  constructor(private summonerService: SummonerService, private searchCriteriaService: TftSearchCriteriaService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const region = params['region'];
      const tag = params['tag'];
      const name = params['name'];
      const queue = params['queue'];
      const set = params['set'];
      this.searchCriteriaService.initQueue(queue);
      this.searchCriteriaService.initSet(set);
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
