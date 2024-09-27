import {Component, Input, OnInit} from '@angular/core';
import {RIOTSummoner} from "../../../../model/riot/riot-summoner.model";
import {LOLParticipant} from "../../../../model/lol/lol-participant.model";
import {LOLMatch} from "../../../../model/lol/lol-match.model";
import {LOLTeam} from "../../../../model/lol/lol-team.model";
import {TimeService} from "../../../../service/time.service";
import {RiotImageService} from "../../../../service/riot/riot-image.service";

@Component({
  selector: 'lol-match',
  templateUrl: './lol-match.component.html',
  styleUrls: ['./lol-match.component.css']
})
export class LolMatchComponent implements OnInit {

  @Input() match!: LOLMatch;
  @Input() summoner!: RIOTSummoner;

  summonerParticipant!: LOLParticipant;
  allDataIsDisplayed: boolean = false;
  summonerTeam: LOLTeam = new LOLTeam();
  enemyTeam: LOLTeam = new LOLTeam();
  topDamage: number = 0;

  constructor(protected timeService: TimeService, protected imageService: RiotImageService) {
  }

  ngOnInit(): void {
    this.findSummonerTeamAndParticipant();
    this.setTopDamage();
  }

  findSummonerTeamAndParticipant(): void {
    this.summonerTeam = this.match.teams.find(team => {
      return team.participants.find(participant => {
        return participant.summoner.puuid === this.summoner.puuid;
      });
    })!;
    this.summonerParticipant = this.summonerTeam.participants.find(participant => {
      return participant.summoner.puuid === this.summoner.puuid;
    })!;
    this.enemyTeam = this.match.teams.find(team => team != this.summonerTeam)!;
    //TODO make a list of enemy teams (arena)
  }

  showAllMatchData() {
    this.allDataIsDisplayed = !this.allDataIsDisplayed;
  }

  getResult(): string {
    return this.match.remake ? "REMAKE" : this.summonerTeam.hasWin ? "VICTORY" : "DEFEAT";
  }

  getKDA(): string {
    return ((this.summonerParticipant.kills + this.summonerParticipant.assists) / Math.max(this.summonerParticipant.deaths, 1)).toFixed(2);
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
