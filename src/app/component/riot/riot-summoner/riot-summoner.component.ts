import {Component, Input, OnChanges} from '@angular/core';
import {RIOTSummoner} from "../../../model/riot/riot-summoner.model";
import {HeaderService} from "../../../config/headers.service";
import {TFTRank} from "../../../model/tft/tft-rank.model";
import {HttpClient} from "@angular/common/http";
import {concatMap, Observable, tap} from "rxjs";
import {LOLRank} from "../../../model/lol/lol-rank.model";

@Component({
  selector: 'riot-summoner',
  templateUrl: './riot-summoner.component.html',
  styleUrls: ['./riot-summoner.component.css']
})
export class RiotSummonerComponent implements OnChanges {

  @Input() isParentComponentReady: boolean = false;
  @Input() localSummoner: RIOTSummoner | undefined;
  @Input() remoteSummoner: RIOTSummoner | undefined;

  isThisComponentReady: boolean = false;
  summoner: RIOTSummoner | undefined;
  nextAllowedUpdate: number = 0;

  constructor(private http: HttpClient) {
  }

  ngOnChanges(): void {
    if (this.isParentComponentReady) {
      if (this.localSummoner != undefined) {
        this.summoner = this.localSummoner;
        this.updateRemainingTime();
        setInterval(() => {
          this.updateRemainingTime();
        }, 1000);
      } else if (this.remoteSummoner != undefined) {
        this.summoner = this.remoteSummoner;
      } else {
        this.summoner = undefined;
      }
      this.isThisComponentReady = true;
    }
  }

  importRemoteSummoner(): Observable<RIOTSummoner> {
    return this.http
      .post<RIOTSummoner>('http://localhost:8080/riot/summoner/update/' + this.summoner!.region + '/' + this.summoner!.tag + '/' + this.summoner!.name, {}, {
        headers: HeaderService.getHeaders(),
      })
      .pipe(
        tap(() => {
        })
      );
  }

  updateSummoner(): void {
    if (this.nextAllowedUpdate === 0) {
      this.importRemoteSummoner()
        .pipe(/*
          concatMap(() => this.updateTFTRanks()),*/
          concatMap(() => this.updateLOLRanks()),/*
          concatMap(() => this.updateTFTMatches()),*/
          concatMap(() => this.updateLOLMatches()),
          tap(() => location.reload())
        )
        .subscribe();
    }
  }

  updateTFTRanks(): Observable<TFTRank[]> {
    return this.http
      .post<TFTRank[]>('http://localhost:8080/tft/rank/' + this.summoner!.id, {}, {
        headers: HeaderService.getHeaders(),
      });
  }

  updateLOLRanks(): Observable<TFTRank[]> {
    return this.http
      .post<LOLRank[]>('http://localhost:8080/lol/rank/' + this.summoner!.id, {}, {
        headers: HeaderService.getHeaders(),
      });
  }

  updateTFTMatches(): Observable<Object> {
    return this.http
      .post('http://localhost:8080/tft/matches/' + this.summoner!.puuid, {}, {
        headers: HeaderService.getHeaders(),
      });
  }

  updateLOLMatches(): Observable<Object> {
    return this.http
      .post('http://localhost:8080/lol/matches/' + this.summoner!.puuid, {}, {
        headers: HeaderService.getHeaders(),
      });
  }

  updateRemainingTime() {
    const currentTime = new Date();
    const elapsedTimeInSeconds = (currentTime.getTime() - new Date(this.summoner!.updateDate!).getTime()) / 1000;
    this.nextAllowedUpdate = Math.floor(Math.max(0, 60 - elapsedTimeInSeconds));
  }

  formatTime(seconds: number): string {
    if (seconds < 60) {
      return `${seconds}s`;
    } else {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}min ${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}s`;
    }
  }

  getUpdateDateToString(): string {
    const now = new Date().getTime();
    const elapsedMilliseconds = now - new Date(this.summoner!.updateDate!).getTime();

    const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
    const elapsedMinutes = Math.floor(elapsedSeconds / 60);
    const elapsedHours = Math.floor(elapsedMinutes / 60);
    const elapsedDays = Math.floor(elapsedHours / 24);
    const elapsedMonths = Math.floor(elapsedDays / 30); // Approximation
    const elapsedYears = Math.floor(elapsedDays / 365); // Approximation

    let result = "Updated ";
    if (elapsedYears >= 1) {
      result += `${elapsedYears} year${elapsedYears > 1 ? 's' : ''}`;
    } else if (elapsedMonths >= 1) {
      result += `${elapsedMonths} month${elapsedMonths > 1 ? 's' : ''}`;
    } else if (elapsedDays >= 1) {
      result += `${elapsedDays} day${elapsedDays > 1 ? 's' : ''}`;
    } else if (elapsedHours >= 1) {
      result += `${elapsedHours} hour${elapsedHours > 1 ? 's' : ''}`;
    } else if (elapsedMinutes >= 1) {
      result += `${elapsedMinutes} minute${elapsedMinutes > 1 ? 's' : ''}`;
    } else {
      result += `${elapsedSeconds} second${elapsedSeconds > 1 ? 's' : ''}`;
    }
    return result + ' ago';
  }

}
