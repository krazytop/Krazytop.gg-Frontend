import {Component, Input, OnChanges} from '@angular/core';
import {CRPlayer} from "../../../model/clash-royal/cr-player.model";
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {HTTPRequestService} from "../../../config/http-request.service";
import {environment} from "../../../../environments/environment";
import {TimeService} from "../../../service/time.service";

@Component({
  selector: 'cr-player',
  templateUrl: './cr-player.component.html',
  styleUrls: ['./cr-player.component.css']
})
export class CrPlayerComponent implements OnChanges {

  @Input() localPlayer: CRPlayer | undefined;
  @Input() remotePlayer: CRPlayer | undefined;

  player: CRPlayer | undefined;
  nextPossibleUpdateDate: Date = new Date();
  currentlyUpdating = false;

  constructor(private http: HttpClient, protected timeService: TimeService) {
    setInterval(() => {}, 1000);
  }

  ngOnChanges(): void {
    if (this.localPlayer !== undefined) {
      this.player = this.localPlayer;
      this.nextPossibleUpdateDate = new Date(new Date(this.player!.updateDate!).getTime() + environment.updateClashRoyalFrequency * 1000);
    } else if (this.remotePlayer !== undefined) {
      this.player = this.remotePlayer;
    } else {
      this.player = undefined;
    }
  }

  importRemotePlayer(): Observable<CRPlayer> {
    return this.http
      .post<CRPlayer>(environment.apiURL + 'clash-royal/player/update/' + this.player?.id, {}, {
        headers: HTTPRequestService.getBackendHeaders(),
      })
      .pipe(
        tap(() => {
        })
      );
  }

  updatePlayer(): void {
    this.currentlyUpdating = true;
    this.importRemotePlayer()
      .pipe(
        tap(() => location.reload())
      )
      .subscribe();
  }

  protected readonly Date = Date;
}
