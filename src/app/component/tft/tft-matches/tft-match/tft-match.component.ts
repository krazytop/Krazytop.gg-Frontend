import {Component, Input, OnInit} from '@angular/core';
import {TFTMatch} from "../../../../model/tft/tft-match.model";
import {TFTParticipant} from "../../../../model/tft/tft-participant.model";
import {TFTTrait} from "../../../../model/tft/tft-trait.model";
import {RIOTSummoner} from "../../../../model/riot/riot-summoner.model";
import {TimeService} from "../../../../service/time.service";
import {TFTMatchService} from "../../../../service/tft/tft-match.service";
import {RIOTMatch} from "../../../../model/riot/riot-match.model";

@Component({
  selector: 'tft-match',
  templateUrl: './tft-match.component.html',
  styleUrls: ['./tft-match.component.css']
})
export class TftMatchComponent implements OnInit {

  @Input({ transform: (match: RIOTMatch): TFTMatch => match as TFTMatch }) match!: TFTMatch;
  @Input() summoner!: RIOTSummoner;

  summonerParticipant!: TFTParticipant;
  allDataIsDisplayed: boolean = false;

  constructor(protected timeService: TimeService, private matchService: TFTMatchService) {
  }

  ngOnInit(): void {
    this.summonerParticipant = this.matchService.getSummonerParticipant(this.match, this.summoner);
  }

  toggleShowAllMatchData() {
    this.allDataIsDisplayed = !this.allDataIsDisplayed;
  }

  get activeTraits(): TFTTrait[][] {
    let activeTraits: TFTTrait[][] = [];
    let column: TFTTrait[] = [];
    const sortedTraits = (this.summonerParticipant ? this.summonerParticipant.traits : []).sort((a, b) => b.nomenclature.effects[b.tier].style - a.nomenclature.effects[a.tier].style);
    for (let trait of sortedTraits) {
      if (trait.tier > 0) {
        if (column.length === 3) {
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

  get placement() {
    const placement = this.matchService.getSummonerParticipant(this.match, this.summoner).placement;
    if (placement === 1) {
      return '1st';
    } else if (placement === 2) {
      return '2nd';
    } else if (placement === 3) {
      return '3rd';
    } else {
      return `${placement}th`;
    }
  }

}
