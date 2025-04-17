import {Injectable} from '@angular/core';
import {HTTPRequestService} from "../../config/http-request.service";
import {environment} from "../../../environments/environment";
import {RIOTRank} from "../../model/riot/riot-rank.model";
import {RIOTBoard} from "../../model/riot/riot-board.model";
import {RIOTSummoner} from "../../model/riot/riot-summoner.model";

@Injectable({
  providedIn: 'root',
})
export class RIOTBoardService {

  constructor(private httpRequestService: HTTPRequestService) {
  }

  async getBoard(boardId: string, isLOL: boolean) {
    const response = await fetch(`${environment.apiURL}${isLOL ? 'lol' : 'tft'}/board/${boardId}`, {headers: HTTPRequestService.getBackendHeaders()});
    return await this.httpRequestService.hasResponse(response) ? await response.json() as RIOTBoard : undefined;
  }

  async createBoard(isLOL: boolean) {
    const response = await fetch(`${environment.apiURL}${isLOL ? 'lol' : 'tft'}/board`,
      {headers: HTTPRequestService.getBackendHeaders(), method: 'POST'});
    return await this.httpRequestService.hasResponse(response) ? await response.text() : undefined;
  }

  async addSummonerToBoard(boardId: string, region: string, tag: string, name: string, isLOL: boolean) {
    const response = await fetch(`${environment.apiURL}${isLOL ? 'lol' : 'tft'}/board/${boardId}/add/${region}/${tag}/${name}`,
      {headers: HTTPRequestService.getBackendHeaders(), method: 'POST'});
    return await this.httpRequestService.hasResponse(response) ? await response.json() as RIOTSummoner : undefined;
  }

  async removeSummonerOfBoard(boardId: string, summonerId: string, isLOL: boolean) {
    const response = await fetch(`${environment.apiURL}${isLOL ? 'lol' : 'tft'}/board/${boardId}/remove/${summonerId}`,
      {headers: HTTPRequestService.getBackendHeaders(), method: 'POST'});
    await this.httpRequestService.hasResponse(response);
  }

  async updateBoardSummoners(boardId: string, isLOL: boolean) {
    const response = await fetch(`${environment.apiURL}${isLOL ? 'lol' : 'tft'}/board/${boardId}`,
      {headers: HTTPRequestService.getBackendHeaders(), method: 'POST'});
    await this.httpRequestService.hasResponse(response);
  }

  async updateBoardName(boardId: string, name: string, isLOL: boolean) {
    const response = await fetch(`${environment.apiURL}${isLOL ? 'lol' : 'tft'}/board/${boardId}/${name}`,
      {headers: HTTPRequestService.getBackendHeaders(), method: 'POST'});
    return await this.httpRequestService.hasResponse(response);
  }
}
