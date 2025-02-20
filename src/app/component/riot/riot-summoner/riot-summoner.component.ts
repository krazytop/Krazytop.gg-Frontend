import {Component, Input, OnChanges} from '@angular/core';
import {RIOTSummoner} from "../../../model/riot/riot-summoner.model";
import {RIOTSummonerService} from "../../../service/riot/riot-summoner.service";
import {ActivatedRoute} from "@angular/router";
import {RIOTImageService} from "../../../service/riot/riot-image.service";
import {TimeService} from "../../../service/time.service";
import {environment} from "../../../../environments/environment";
import {RIOTMetadata} from "../../../model/riot/riot-metadata.model";

@Component({
  selector: 'riot-summoner',
  templateUrl: './riot-summoner.component.html',
  styleUrls: ['./riot-summoner.component.css']
})
export class RiotSummonerComponent implements OnChanges {

  @Input() localSummoner: RIOTSummoner | undefined;
  @Input() remoteSummoner: RIOTSummoner | undefined;
  @Input() metadata!: RIOTMetadata;

  isThisComponentReady: boolean = false;
  summoner: RIOTSummoner | undefined;
  nextAllowedUpdate: number = 0;
  currentlyUpdating = false;

  constructor(private summonerService: RIOTSummonerService, private route: ActivatedRoute, protected imageService: RIOTImageService, protected timeService: TimeService) {
  }

  ngOnChanges(): void {
    if (this.localSummoner !== undefined) {
      this.summoner = this.localSummoner;
      this.nextAllowedUpdate = this.timeService.getSecondsRemainingUntilNextAllowedUpdate(this.summoner!.updateDate!, environment.updateRIOTFrequency);
      setInterval(() => {
        this.nextAllowedUpdate = this.timeService.getSecondsRemainingUntilNextAllowedUpdate(this.summoner!.updateDate!, environment.updateRIOTFrequency);
      }, 1000);
    } else if (this.remoteSummoner !== undefined) {
      this.summoner = this.remoteSummoner;
    } else {
      this.summoner = undefined;
    }
    this.isThisComponentReady = true;
  }

  async updateData() {
    this.currentlyUpdating = true;
    let role: string | null = this.route.snapshot.paramMap.get('role');
    role ? await this.summonerService.updateLOLData(this.summoner!) : await this.summonerService.updateTFTData(this.summoner!);
    window.location.reload();
  }

  protected readonly Date = Date;
}
