import {Injectable} from '@angular/core';
import {HTTPRequestService} from "../../config/http-request.service";
import {RIOTSummoner} from "../../model/riot/riot-summoner.model";
import {environment} from "../../../environments/environment";
import {RIOTMetadata} from "../../model/riot/riot-metadata.model";
import {RIOTRank} from "../../model/riot/riot-rank.model";
import {LOLMasteries} from "../../model/lol/lol-mastery.model";

@Injectable({
  providedIn: 'root',
})
export class LOLMasteryService {

  constructor(private httpRequestService: HTTPRequestService) {
  }

  async getMasteries(puuid: string) {
    const response = await fetch(`${environment.apiURL}lol/mastery/${puuid}`, {headers: HTTPRequestService.getBackendHeaders()});
    return await this.httpRequestService.hasResponse(response) ? await response.json() as LOLMasteries: new LOLMasteries();
  }

  async updateMasteries(puuid: string) {
    const response = await fetch(`${environment.apiURL}lol/mastery/${puuid}`,
      {headers: HTTPRequestService.getBackendHeaders(), method: 'POST'});
    await this.httpRequestService.hasResponse(response);
  }

}
