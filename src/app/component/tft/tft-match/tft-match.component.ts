import {Component, Input, OnInit} from '@angular/core';
import {TFTMatch} from "../../../model/tft/tft-match.model";
import {TFTParticipant} from "../../../model/tft/tft-participant.model";
import {TFTTrait} from "../../../model/tft/tft-trait.model";
import {RIOTSummoner} from "../../../model/riot/riot-summoner.model";
import {TimeService} from "../../../service/time.service";
import {TFTMatchService} from "../../../service/tft/tft-match.service";
import {RIOTMatch} from "../../../model/riot/riot-match.model";
import {RIOTImageService} from "../../../service/riot/riot-image.service";
import {RIOTPatchService} from "../../../service/riot/riot-patch.service";

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
  matchVersion!: string;
  activeTraits!: TFTTrait[][];

  constructor(protected timeService: TimeService, private matchService: TFTMatchService, protected imageService: RIOTImageService, protected patchService: RIOTPatchService) {
  }

  ngOnInit(): void {
    this.matchVersion = this.match.version.split('/').at(-1)!.replace('>', '');
    this.summonerParticipant = this.matchService.getSummonerParticipant(this.match, this.summoner);
    this.setActiveTraits();
  }

  toggleShowAllMatchData() {
    this.allDataIsDisplayed = !this.allDataIsDisplayed;
  }

  setActiveTraits() {
    let activeTraits: TFTTrait[][] = [];
    const sortedTraits = this.summonerParticipant.traits
      .filter(trait => trait.tier !== 0)
      .sort((a, b) => this.patchService.getTFTTraitNomenclature(this.matchVersion, b.id)!.effects[b.tier - 1].style - this.patchService.getTFTTraitNomenclature(this.matchVersion, a.id)!.effects[a.tier - 1].style);
    for (let i = 0; i < sortedTraits.length; i += 3) {
      activeTraits.push(sortedTraits.slice(i, i + 3));
    }
    this.activeTraits = activeTraits;
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

  get queueName() {
    return this.patchService.getTFTQueueNomenclature(this.match.version, this.match.queue)?.name
      .replace(' (ATELIER)', '')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
  }

}
