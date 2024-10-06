import {Component, Input, OnChanges} from '@angular/core';
import {RIOTSummoner} from "../../../model/riot/riot-summoner.model";
import {RiotSummonerService} from "../../../service/riot/riot-summoner.service";
import {ActivatedRoute} from "@angular/router";
import {RiotImageService} from "../../../service/riot/riot-image.service";
import {TimeService} from "../../../service/time.service";

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

  constructor(private summonerService: RiotSummonerService, private route: ActivatedRoute, protected imageService: RiotImageService, protected timeService: TimeService) {
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
      document.getElementById('update-summoner-loading-gif')!.hidden = false;
      (document.getElementById('update-summoner-button')! as HTMLButtonElement).disabled = true;
      let role: string | null = this.route.snapshot.paramMap.get('role');
      role ? await this.summonerService.updateLOLData(this.summoner!) : await this.summonerService.updateTFTData(this.summoner!);
      window.location.reload();
    }
  }

  updateRemainingTime() {
    const elapsedTimeInSeconds = (new Date().getTime() - new Date(this.summoner!.updateDate!).getTime()) / 1000;
    this.nextAllowedUpdate = Math.floor(Math.max(0, 60 - elapsedTimeInSeconds));
  }

  protected readonly Date = Date;
}
