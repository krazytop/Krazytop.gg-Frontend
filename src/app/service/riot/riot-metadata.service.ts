import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {HTTPRequestService} from "../../config/http-request.service";
import {RIOTMetadata} from "../../model/riot/riot-metadata.model";

@Injectable({
  providedIn: 'root',
})
export class RIOTMetadataService {

  constructor(private httpRequestService: HTTPRequestService) {
  }

  public async getLOLMetadata() {
    const response = await fetch(`${environment.apiURL}lol/metadata`, {headers: HTTPRequestService.getBackendHeaders()});
    return await this.httpRequestService.hasResponse(response) ? await response.json() as RIOTMetadata : undefined;
  }

  public async getTFTMetadata() {
    const response = await fetch(`${environment.apiURL}tft/metadata`, {headers: HTTPRequestService.getBackendHeaders()});
    return await this.httpRequestService.hasResponse(response) ? await response.json() as RIOTMetadata : undefined;
  }
}
