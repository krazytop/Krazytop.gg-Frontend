import {Component, Input, OnInit} from '@angular/core';
import {TFTMatch} from "../../../../model/tft/tft-match.model";
import {TFTParticipant} from "../../../../model/tft/tft-participant.model";
import {TFTTrait} from "../../../../model/tft/tft-trait.model";
import {RIOTSummoner} from "../../../../model/riot/riot-summoner.model";

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

  ngOnInit(): void {
    this.findSummonerParticipant();
  }

  findSummonerParticipant(): void {
    this.summonerParticipant = this.match.participants.find((participant: TFTParticipant) => participant.puuid == this.summoner.puuid);
  }

  getLifetime(): string {
    const minutes = Math.floor(this.match.length / 60);
    const seconds = Math.floor(this.match.length - minutes * 60);
    return minutes.toString().padStart(2, '0') + 'm ' + seconds.toString().padStart(2, '0') + 's';
  }

  getDatetime(): string {
    const now = new Date().getTime();
    const elapsedMilliseconds = now - this.match.datetime;

    const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
    const elapsedMinutes = Math.floor(elapsedSeconds / 60);
    const elapsedHours = Math.floor(elapsedMinutes / 60);
    const elapsedDays = Math.floor(elapsedHours / 24);
    const elapsedMonths = Math.floor(elapsedDays / 30); // Approximation
    const elapsedYears = Math.floor(elapsedDays / 365); // Approximation

    let result = "";
    if (elapsedYears >= 1) {
      result += `${elapsedYears} year${elapsedYears > 1 ? 's' : ''}`;
    } else if (elapsedMonths >= 1) {
      result += `${elapsedMonths} month${elapsedMonths > 1 ? 's' : ''}`;
    } else if (elapsedDays >= 1) {
      result += `${elapsedDays} day${elapsedDays > 1 ? 's' : ''}`;
    } else if (elapsedHours >= 1) {
      result += `${elapsedHours} hour${elapsedHours > 1 ? 's' : ''}`;
    } else if (elapsedMinutes >= 1) {
      result += `${elapsedMinutes} minute${elapsedMinutes > 1 ? 's' : ''}`;
    } else {
      result += `${elapsedSeconds} second${elapsedSeconds > 1 ? 's' : ''}`;
    }
    return result + ' ago';
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
