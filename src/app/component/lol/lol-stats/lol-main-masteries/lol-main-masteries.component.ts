import {Component, Input, OnChanges} from '@angular/core';
import {RIOTSummoner} from "../../../../model/riot/riot-summoner.model";
import {environment} from "../../../../../environments/environment";
import {LOLMasteries} from "../../../../model/lol/lol-mastery.model";
import {HTTPRequestService} from "../../../../config/http-request.service";
import {RIOTImageService} from "../../../../service/riot/riot-image.service";
import {FormatService} from "../../../../service/format.service";
import {RIOTMetadata} from "../../../../model/riot/riot-metadata.model";
import {RIOTPatchService} from "../../../../service/riot/riot-patch.service";

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

  constructor(private httpRequestService: HTTPRequestService, protected imageService: RIOTImageService, protected formatService:FormatService, protected patchService: RIOTPatchService) {
  }

  async ngOnChanges() {
    await this.getMasteries();
  }

  private async getMasteries() {
    const response = await fetch(`${environment.apiURL}lol/masteries/${this.summoner.puuid}`, {headers: HTTPRequestService.getBackendHeaders(),});
    const masteries: LOLMasteries = await this.httpRequestService.hasResponse(response) ? await response.json() : [];
    masteries.champions = masteries.champions.sort((a,b) => b.points - a.points).splice(0, 5);
    this.masteries = masteries;
  }

  protected readonly Math = Math;
}
