import {Component, Input, OnInit} from '@angular/core';
import {RIOTSummoner} from "../../../../../model/riot/riot-summoner.model";
import {LOLParticipant} from "../../../../../model/lol/lol-participant.model";

@Component({
  selector: 'lol-match-participant',
  templateUrl: './lol-match-participant.component.html',
  styleUrls: ['./lol-match-participant.component.css']
})
export class LolMatchParticipantComponent implements OnInit {

  @Input() participant!: LOLParticipant;
  @Input() topDamage!: number;
  @Input() summoner!: RIOTSummoner;
  @Input() hasWin!: boolean;
  @Input() matchVersion!: string;

  damage: number = 0;

  ngOnInit(): void {
    this.setDamage();
  }

  getImageUrl(image: string, component: string) {
    return `https://ddragon.leagueoflegends.com/cdn/${this.matchVersion}/img/${component}/${image}`;
  }

  getRuneImageUrl(image: string) {
    return `https://ddragon.leagueoflegends.com/cdn/img/${image}`
  }

  getKDA(): string {
    return ((this.participant.kills + this.participant.assists) / this.participant.deaths).toFixed(2);
  }

  setDamage() {
    this.damage = this.participant.physicalDamageDealtToChampions + this.participant.magicDamageDealtToChampions + this.participant.trueDamageDealtToChampions;
  }

  getGolds(): string {
    return (this.participant.golds / 1000).toFixed(1) + 'k';
  }

  getDamage(): string {
    if (this.damage > 1000) {
      const thousands = Math.floor(this.damage / 1000);
      const remainder = this.damage % 1000;
      if (thousands > 0) {
        return `${thousands} ${remainder.toString().padStart(3, '0')}`;
      } else {
        return `${remainder}`;
      }
    } else {
      return this.damage.toString();
    }
  }

}
