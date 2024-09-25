import {Component, Input, OnChanges} from '@angular/core';
import {RIOTSummoner} from "../../../../model/riot/riot-summoner.model";
import {environment} from "../../../../../environments/environment";
import {LolMastery} from "../../../../model/lol/lol-mastery.model";
import {HTTPRequestService} from "../../../../config/http-request.service";

@Component({
  selector: 'lol-main-masteries',
  templateUrl: './lol-main-masteries.component.html',
  styleUrls: ['./lol-main-masteries.component.css']
})
export class LolMainMasteriesComponent implements OnChanges {

  @Input() summoner: RIOTSummoner = new RIOTSummoner();

  protected masteries: LolMastery[] = [];

  constructor(private httpRequestService: HTTPRequestService) {
  }

  async ngOnChanges() {
    await this.getMasteries();
    console.log(this.masteries)
  }

  private async getMasteries() {
    const response = await fetch(`${environment.apiURL}lol/masteries/${this.summoner.puuid}`, {headers: HTTPRequestService.getBackendHeaders(),});
    this.masteries = await this.httpRequestService.hasResponse(response) ? await response.json() : [];
  }

}
