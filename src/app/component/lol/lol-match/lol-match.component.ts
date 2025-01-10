import {Component, Input, OnInit} from '@angular/core';
import {RIOTSummoner} from "../../../model/riot/riot-summoner.model";
import {LOLParticipant} from "../../../model/lol/lol-participant.model";
import {LOLMatch} from "../../../model/lol/lol-match.model";
import {TimeService} from "../../../service/time.service";
import {RIOTImageService} from "../../../service/riot/riot-image.service";
import {LOLMatchService} from "../../../service/lol/lol-match.service";
import {RIOTMatch} from "../../../model/riot/riot-match.model";
import {RIOTPatchService} from "../../../service/riot/riot-patch.service";

@Component({
  selector: 'lol-match',
  templateUrl: './lol-match.component.html',
  styleUrls: ['./lol-match.component.css']
})
export class LolMatchComponent implements OnInit {

  @Input({ transform: (match: RIOTMatch): LOLMatch => match as LOLMatch }) match!: LOLMatch;
  @Input() summoner!: RIOTSummoner;

  summonerParticipant!: LOLParticipant;
  allDataIsDisplayed: boolean = false;

  constructor(protected timeService: TimeService, protected imageService: RIOTImageService, private matchService: LOLMatchService, protected patchService: RIOTPatchService) {
  }

  ngOnInit(): void {
    this.summonerParticipant = this.matchService.getSummonerParticipant(this.match, this.summoner);
    this.match.teams = this.match.teams.sort((a,b) => a.placement! - b.placement!);
  }

  toggleShowAllMatchData() {
    this.allDataIsDisplayed = !this.allDataIsDisplayed;
  }

  get result(): string {
    if (this.match.remake) {
      return "REMAKE";
    } else {
      return this.matchService.getSummonerTeam(this.match, this.summoner).hasWin ? "VICTORY" : "DEFEAT";
    }
  }

  get kda(): string {
    return ((this.summonerParticipant.kills + this.summonerParticipant.assists) / Math.max(this.summonerParticipant.deaths, 1)).toFixed(2);
  }

  get topDamage() {
    let topDamage = 0;
    this.match.teams.forEach(team => {
      team.participants.forEach(participant => {
        const totalDamage = participant.physicalDamageDealtToChampions + participant.magicDamageDealtToChampions + participant.trueDamageDealtToChampions;
        topDamage = Math.max(topDamage, totalDamage);
      });
    });
    return topDamage;
  }

  get isArena() {
    return this.match.queue === '1700' || this.match.queue === '1710';
  }

  get placement() {
    const placement = this.matchService.getSummonerTeam(this.match, this.summoner).placement;
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

  get queueName() {
    return this.patchService.getLOLQueueNomenclature(this.match.version, this.match.queue)?.name
      .replace('games', '')
      .replace('5v5', '')
  }

}
