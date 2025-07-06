import {Injectable} from '@angular/core';
import {HTTPRequestService} from "../../config/http-request.service";
import {RIOTSummoner} from "../../model/riot/riot-summoner.model";
import {environment} from "../../../environments/environment";
import {RIOTMetadata} from "../../model/riot/riot-metadata.model";
import {RIOTRank} from "../../model/riot/riot-rank.model";

@Injectable({
  providedIn: 'root',
})
export class RIOTRankService {

  constructor(private httpRequestService: HTTPRequestService) {
  }

  async getRanks(puuid: string, isLOL: boolean) {
    const response = await fetch(`${environment.apiURL}${isLOL ? 'lol' : 'tft'}/rank/${puuid}`, {headers: HTTPRequestService.getBackendHeaders()});
    return await this.httpRequestService.hasResponse(response, false) ? await response.json() as RIOTRank: undefined;
  }

  async updateRanks(puuid: string, isLOL: boolean) {
    const response = await fetch(`${environment.apiURL}${isLOL ? 'lol' : 'tft'}/rank/${puuid}`,
      {headers: HTTPRequestService.getBackendHeaders(), method: 'POST'});
    await this.httpRequestService.hasResponse(response);
  }

  getRank(allRanks: RIOTRank | undefined, seasonOrSet: number, queue: string) {
    return allRanks?.seasonOrSetRanks
      .find(seasonOrSetRank => seasonOrSetRank.nb === seasonOrSet)?.queueRanks
      .find(queueRank => queueRank.name === queue);
  }

}
