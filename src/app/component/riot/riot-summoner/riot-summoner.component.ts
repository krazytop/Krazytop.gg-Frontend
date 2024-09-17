import {Component, Input, OnChanges} from '@angular/core';
import {RIOTSummoner} from "../../../model/riot/riot-summoner.model";
import {SummonerService} from "./summoner.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'riot-summoner',
  templateUrl: './riot-summoner.component.html',
  styleUrls: ['./riot-summoner.component.css']
})
export class RiotSummonerComponent implements OnChanges {

  @Input() localSummoner: RIOTSummoner | undefined;
  @Input() remoteSummoner: RIOTSummoner | undefined;

  isThisComponentReady: boolean = false;
  summoner: RIOTSummoner | undefined;
  nextAllowedUpdate: number = 0;

  constructor(private summonerService: SummonerService, private route: ActivatedRoute) {
  }

  ngOnChanges(): void {
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

  async updateData() {
    if (this.nextAllowedUpdate === 0) {
      let role: string | undefined;
      this.route.params.subscribe(params => {
        role = params['role'];
      })
      role ? await this.summonerService.updateLOLData(this.summoner!) : await this.summonerService.updateTFTData(this.summoner!)
    }
  }

  updateRemainingTime() {
    const elapsedTimeInSeconds = (new Date().getTime() - new Date(this.summoner!.updateDate!).getTime()) / 1000;
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
