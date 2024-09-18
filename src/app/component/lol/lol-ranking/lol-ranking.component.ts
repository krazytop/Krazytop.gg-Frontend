import {Component, Input, OnChanges} from '@angular/core';
import {RIOTSummoner} from "../../../model/riot/riot-summoner.model";
import {HeaderService} from "../../../config/headers.service";
import {LOLRank} from "../../../model/lol/lol-rank.model";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'lol-ranking',
  templateUrl: './lol-ranking.component.html',
  styleUrls: ['./lol-ranking.component.css']
})
export class LolRankingComponent implements OnChanges {

  @Input() summoner: RIOTSummoner = new RIOTSummoner();

  waitingScreen: boolean = true;

  soloRank?: LOLRank;
  flexRank?: LOLRank;

  async ngOnChanges() {
    this.waitingScreen = true;
    await this.getSoloRank();
    await this.getFlexRank();
    this.waitingScreen = false;
  }

  async getSoloRank() {
    const response = await fetch(`${environment.apiURL}lol/rank/${this.summoner.id}/RANKED_SOLO_5x5`, {headers: HeaderService.getBackendHeaders(),});
    console.log(response)
    this.soloRank = await response.json();
    console.log(this.soloRank)
  }

  async getFlexRank() {
    const response = await fetch(`${environment.apiURL}lol/rank/${this.summoner.id}/RANKED_TEAM_5x5'`, {headers: HeaderService.getBackendHeaders(),})
    this.flexRank = await response.json();
    console.log(this.flexRank)
  }

}
