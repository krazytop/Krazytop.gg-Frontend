import {Component, Input, OnInit} from '@angular/core';
import {RIOTSummoner} from "../../../../../model/riot/riot-summoner.model";
import {LOLParticipant} from "../../../../../model/lol/lol-participant.model";
import {RiotImageService} from "../../../../../service/riot/riot-image.service";
import {FormatService} from "../../../../../service/format.service";

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
  @Input() remake!: boolean;

  damage: number = 0;

  constructor(protected imageService: RiotImageService, protected formatService: FormatService) {
  }

  ngOnInit(): void {
    this.setDamage();
  }

  getKDA(): string {
    return ((this.participant.kills + this.participant.assists) / Math.max(this.participant.deaths, 1)).toFixed(2);
  }

  setDamage() {
    this.damage = this.participant.physicalDamageDealtToChampions + this.participant.magicDamageDealtToChampions + this.participant.trueDamageDealtToChampions;
  }

  getGolds(): string {
    return (this.participant.golds / 1000).toFixed(1) + 'k';
  }

}
