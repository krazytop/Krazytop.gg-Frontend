import {Component, Input, OnInit} from '@angular/core';
import {RIOTSummoner} from "../../../../model/riot/riot-summoner.model";
import {LOLParticipant} from "../../../../model/lol/lol-participant.model";
import {LOLMatch} from "../../../../model/lol/lol-match.model";
import {LOLTeam} from "../../../../model/lol/lol-team.model";
import {TimeService} from "../../../../service/time.service";

@Component({
  selector: 'lol-match',
  templateUrl: './lol-match.component.html',
  styleUrls: ['./lol-match.component.css']
})
export class LolMatchComponent implements OnInit {

  @Input() match!: LOLMatch;
  @Input() summoner: RIOTSummoner = new RIOTSummoner();

  summonerParticipant!: LOLParticipant;
  allDataIsDisplayed: boolean = false;
  summonerTeam: LOLTeam = new LOLTeam();
  enemyTeam: LOLTeam = new LOLTeam();
  topDamage: number = 0;

  constructor(protected timeService: TimeService) {
  }

  ngOnInit(): void {
    this.findSummonerTeamAndParticipant();
    this.setTopDamage();
    const versionArray = this.match.version.split('.');
    this.match.version = `${versionArray[0]}.${versionArray[1]}.1`;
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

  getImageUrl(image: string, component: string) {
    return `https://ddragon.leagueoflegends.com/cdn/${this.match.version}/img/${component}/${image}`;
  }

  getRuneImageUrl(image: string) {
    return `https://ddragon.leagueoflegends.com/cdn/img/${image}`
  }

  showAllMatchData() {
    this.allDataIsDisplayed = !this.allDataIsDisplayed;
  }

  getResult(): string {
    return this.summonerTeam.hasWin ? "VICTORY" : "DEFEAT";
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
