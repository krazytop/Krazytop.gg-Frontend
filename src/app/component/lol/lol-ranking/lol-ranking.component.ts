import {Component, Input, OnChanges} from '@angular/core';
import {RIOTSummoner} from "../../../model/riot/riot-summoner.model";
import {HttpClient} from "@angular/common/http";
import {HeaderService} from "../../../config/headers.service";
import {LOLRank} from "../../../model/lol/lol-rank.model";

@Component({
  selector: 'lol-ranking',
  templateUrl: './lol-ranking.component.html',
  styleUrls: ['./lol-ranking.component.css']
})
export class LolRankingComponent implements OnChanges {

  @Input() isParentComponentReady: boolean = false;
  @Input() summoner: RIOTSummoner = new RIOTSummoner();

  soloRank!: LOLRank;
  flexRank!: LOLRank;

  constructor(private http: HttpClient) {
  }

  ngOnChanges(): void {
    if (this.isParentComponentReady) {
      this.getSoloRank();
      this.getFlexRank();
    }
  }

  getSoloRank() {
    this.http.get<LOLRank>('http://localhost:8080/lol/rank/' + this.summoner.id + '/' + "RANKED_SOLO_5x5", {headers: HeaderService.getHeaders(),}).subscribe((response: LOLRank) => {
      this.soloRank = response;
    })
  }

  getFlexRank() {
    this.http.get<LOLRank>('http://localhost:8080/lol/rank/' + this.summoner.id + '/' + "RANKED_FLEX_SR", {headers: HeaderService.getHeaders(),}).subscribe((response: LOLRank) => {
      this.flexRank = response;
    })
  }

}
