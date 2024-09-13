import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {HeaderService} from "../../../config/headers.service";
import {RIOTSummoner} from "../../../model/riot/riot-summoner.model";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class SummonerService {

  constructor(private http: HttpClient) {
  }

  getLocalSummoner(region: string, tag: string, name: string): Observable<RIOTSummoner> {
    return this.http.get<RIOTSummoner>(environment.apiURL + 'riot/summoner/local/' + region + '/' + tag + '/' + name, {headers: HeaderService.getBackendHeaders()});
  }

  getRemoteSummoner(region: string, tag: string, name: string): Observable<RIOTSummoner> {
    return this.http.get<RIOTSummoner>(environment.apiURL + 'riot/summoner/remote/' + region + '/' + tag + '/' + name, {headers: HeaderService.getBackendHeaders(),});
  }

}
