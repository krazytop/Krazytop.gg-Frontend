import {Component, Input, OnInit} from '@angular/core';
import {RIOTSummoner} from "../../../../model/riot/riot-summoner.model";
import {LOLParticipant} from "../../../../model/lol/lol-participant.model";
import {LOLMatch} from "../../../../model/lol/lol-match.model";
import {LOLTeam} from "../../../../model/lol/lol-team.model";

@Component({
  selector: 'lol-match',
  templateUrl: './lol-match.component.html',
  styleUrls: ['./lol-match.component.css']
})
export class LolMatchComponent implements OnInit {

  @Input() match!: LOLMatch;
  @Input() summoner: RIOTSummoner = new RIOTSummoner();

  summonerParticipant: LOLParticipant | undefined;
  allDataIsDisplayed: boolean = false;
  summonerTeam: LOLTeam = new LOLTeam();
  enemyTeam: LOLTeam = new LOLTeam();
  topDamage: number = 0;

  ngOnInit(): void {
    this.findSummonerTeamAndParticipant();
    this.setTopDamage();
  }

  findSummonerTeamAndParticipant(): void {
    for (let team of this.match.teams) {
      for (let participant of team.participants) {
        if (participant.summoner.puuid === this.summoner.puuid) {
          this.summonerTeam = team;
          this.summonerParticipant = participant;
        }
      }
    }
    for (let team of this.match.teams) {
      if (team !== this.summonerTeam) {
        this.enemyTeam = team;
        break;
      }
    }
  }

  getGameDuration(): string {
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

  showAllMatchData() {
    this.allDataIsDisplayed = !this.allDataIsDisplayed;
  }

  getResult(): string {
    let result = "";
    for (let team of this.match.teams) {
      for (let participant of team.participants) {
        if (participant.summoner.puuid === this.summoner.puuid) {
          result = team.hasWin ? "VICTORY" : "DEFEAT";
        }
      }
    }
    return result;
  }

  getKDA(): string {
    return ((this.summonerParticipant!.kills + this.summonerParticipant!.assists) / this.summonerParticipant!.deaths).toFixed(2);
  }

  setTopDamage() {
    for (let team of this.match.teams) {
      for (let participant of team.participants) {
        let totalDamage = participant.physicalDamageDealtToChampions + participant.magicDamageDealtToChampions + participant.trueDamageDealtToChampions;
        if (totalDamage > this.topDamage) {
          this.topDamage = totalDamage;
        }
      }
    }
  }


}
