import {Component, Input, OnChanges} from '@angular/core';
import {RIOTSummoner} from "../../../../model/riot/riot-summoner.model";
import {environment} from "../../../../../environments/environment";
import {LolMastery} from "../../../../model/lol/lol-mastery.model";
import {HTTPRequestService} from "../../../../config/http-request.service";
import {RIOTImageService} from "../../../../service/riot/riot-image.service";
import {FormatService} from "../../../../service/format.service";

@Component({
  selector: 'lol-main-masteries',
  templateUrl: './lol-main-masteries.component.html',
  styleUrls: ['./lol-main-masteries.component.css']
})
export class LolMainMasteriesComponent implements OnChanges {

  @Input() summoner!: RIOTSummoner;
  @Input() version?: string;

  protected masteries: LolMastery[] = [];

  constructor(private httpRequestService: HTTPRequestService, protected imageService: RIOTImageService, protected formatService:FormatService) {
  }

  async ngOnChanges() {
    await this.getMasteries();
  }

  private async getMasteries() {
    const response = await fetch(`${environment.apiURL}lol/masteries/${this.summoner.puuid}`, {headers: HTTPRequestService.getBackendHeaders(),});
    const masteries: LolMastery[] = await this.httpRequestService.hasResponse(response) ? await response.json() : [];
    this.masteries = masteries.sort((a,b) => b.points - a.points).splice(0, 5);
  }

  protected readonly Math = Math;
}
