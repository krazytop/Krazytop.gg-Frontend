import {Component, Input, OnInit} from '@angular/core';
import {TFTMatch} from "../../../../model/tft/tft-match.model";
import {TFTParticipant} from "../../../../model/tft/tft-participant.model";
import {TFTTrait} from "../../../../model/tft/tft-trait.model";
import {RIOTSummoner} from "../../../../model/riot/riot-summoner.model";
import {TimeService} from "../../../../service/time.service";

@Component({
  selector: 'tft-match',
  templateUrl: './tft-match.component.html',
  styleUrls: ['./tft-match.component.css']
})
export class TftMatchComponent implements OnInit {

  @Input() match!: TFTMatch;
  @Input() summoner: RIOTSummoner = new RIOTSummoner();

  summonerParticipant: TFTParticipant | undefined;
  allDataIsDisplayed: boolean = false;

  constructor(protected timeService: TimeService) {
  }

  ngOnInit(): void {
    this.findSummonerParticipant();
  }

  findSummonerParticipant(): void {
    this.summonerParticipant = this.match.participants.find((participant: TFTParticipant) => participant.puuid == this.summoner.puuid);
  }

  getActiveTraits(): TFTTrait[][] {
    let activeTraits: TFTTrait[][] = [];
    let column: TFTTrait[] = [];
    const sortedTraits = (this.summonerParticipant ? this.summonerParticipant.traits : []).sort((a, b) => b.style - a.style);
    for (let trait of sortedTraits) {
      if (trait.currentTier > 0) {
        if (column.length == 3) {
          activeTraits.push(column);
          column = []
        }
        column.push(trait);
      }
    }
    activeTraits.push(column);
    return activeTraits;
  }

  showAllMatchData() {
    this.allDataIsDisplayed = !this.allDataIsDisplayed;
  }


}
