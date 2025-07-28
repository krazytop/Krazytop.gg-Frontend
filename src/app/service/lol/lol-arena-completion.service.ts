import {Injectable} from '@angular/core';
import {HTTPRequestService} from "../../config/http-request.service";
import {environment} from "../../../environments/environment";
import {LOLArenaCompletion} from "../../model/lol/lol-arena-completion.model";

@Injectable({
  providedIn: 'root',
})
export class LOLArenaCompletionService {

  constructor(private httpRequestService: HTTPRequestService) {
  }

  async getArenaCompletion(puuid: string) {
    const response = await fetch(`${environment.apiURL}lol/arena-completion/${puuid}`, {headers: HTTPRequestService.getBackendHeaders()});
    return await this.httpRequestService.hasResponse(response) ? await response.json() as LOLArenaCompletion: new LOLArenaCompletion();
  }

}
