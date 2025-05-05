import {Component, Input, OnChanges} from '@angular/core';
import {RIOTSummoner} from "../../../../model/riot/riot-summoner.model";
import {LOLMasteries} from "../../../../model/lol/lol-mastery.model";
import {RIOTImageService} from "../../../../service/riot/riot-image.service";
import {FormatService} from "../../../../service/format.service";
import {RIOTMetadata} from "../../../../model/riot/riot-metadata.model";
import {RIOTPatchService} from "../../../../service/riot/riot-patch.service";
import {LOLMasteryService} from "../../../../service/lol/lol-mastery.service";

@Component({
  selector: 'lol-main-masteries',
  templateUrl: './lol-main-masteries.component.html',
  styleUrls: ['./lol-main-masteries.component.css']
})
export class LOLMainMasteriesComponent implements OnChanges {

  @Input() summoner!: RIOTSummoner;
  @Input() version?: string;
  @Input() metadata!: RIOTMetadata;

  protected masteries?: LOLMasteries;

  constructor(protected imageService: RIOTImageService, protected formatService:FormatService, protected patchService: RIOTPatchService, private masteryService: LOLMasteryService) {
  }

  async ngOnChanges() {
    this.masteries = await this.masteryService.getMasteries(this.summoner.puuid);
    this.masteries.champions = this.masteries.champions.sort((a,b) => b.points - a.points).splice(0, 5);
  }

  protected readonly Math = Math;
}
