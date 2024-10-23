import {Component, OnInit} from '@angular/core';
import {RIOTSummoner} from "../../model/riot/riot-summoner.model";
import {RiotSummonerService} from "../../service/riot/riot-summoner.service";
import {ActivatedRoute} from "@angular/router";
import {LOLMatch} from "../../model/lol/lol-match.model";

@Component({
  selector: 'league-of-legends',
  templateUrl: './league-of-legends.component.html',
  styleUrls: ['./league-of-legends.component.css']
})
export class LeagueOfLegendsComponent implements OnInit { //TODO streak => space-between

  isThisComponentReady: boolean = true;

  localSummoner: RIOTSummoner | undefined;
  remoteSummoner: RIOTSummoner | undefined;

  private region!: string;
  private tag!: string;
  private name!: string;
  protected selectedQueue!: string;
  protected selectedRole!: string;
  protected matches: LOLMatch[] | undefined;

  constructor(private summonerService: RiotSummonerService, private route: ActivatedRoute) {
  }

  async ngOnInit() {
    this.route.params.subscribe(async params => {
      this.isThisComponentReady = false;
      this.region = params['region'];
      this.tag = params['tag'];
      this.name = params['name'];
      this.selectedQueue = params['queue'];
      this.selectedRole = params['role'];
      if (this.localSummoner?.name != this.name || this.localSummoner?.region != this.region) {
        const [localSummoner, remoteSummoner] = await this.summonerService.getSummoner(this.region, this.tag, this.name);
        this.localSummoner = localSummoner;
        this.remoteSummoner = remoteSummoner
      }
      this.isThisComponentReady = true;
    });
  }

  protected readonly console = console;
}
