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

  @Input() summoner: RIOTSummoner | undefined;
  @Input() metadata!: RIOTMetadata;

  currentlyUpdating = false;
  nextPossibleUpdateDate: Date = new Date();

  constructor(private summonerService: RIOTSummonerService, private route: ActivatedRoute, protected imageService: RIOTImageService, protected timeService: TimeService) {
    setInterval(() => {}, 1000);
  }

  ngOnChanges(): void {
    if (this.summoner && this.summoner.updateDate) {
      this.nextPossibleUpdateDate = new Date(new Date(this.summoner!.updateDate!).getTime() + environment.updateRIOTFrequency * 1000);
    }
  }

  async updateData() {
    this.currentlyUpdating = true;
    let role: string | null = this.route.snapshot.paramMap.get('role');
    role ? await this.summonerService.updateLOLData(this.summoner!.region, this.summoner!.puuid)
      : await this.summonerService.updateTFTData(this.summoner!.region, this.summoner!.puuid);
    window.location.reload();
  }

}
