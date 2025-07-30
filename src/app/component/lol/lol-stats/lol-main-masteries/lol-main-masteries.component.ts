import {Component, Input, OnChanges} from '@angular/core';
import {RIOTSummoner} from "../../../../model/riot/riot-summoner.model";
import {LOLMasteries, LOLMastery} from "../../../../model/lol/lol-mastery.model";
import {RIOTImageService} from "../../../../service/riot/riot-image.service";
import {FormatService} from "../../../../service/format.service";
import {RIOTMetadata} from "../../../../model/riot/riot-metadata.model";
import {RIOTPatchService} from "../../../../service/riot/riot-patch.service";
import {LOLMasteryService} from "../../../../service/lol/lol-mastery.service";
import {LOLChampionNomenclature} from "../../../../model/lol/nomenclature/lol-champion.nomenclature";

@Component({
  selector: 'lol-main-masteries',
  templateUrl: './lol-main-masteries.component.html',
  styleUrls: ['./lol-main-masteries.component.css']
})
export class LOLMainMasteriesComponent implements OnChanges {

  @Input() summoner!: RIOTSummoner;
  @Input() metadata!: RIOTMetadata;
  protected filter: string = "";

  protected allMasteries!: LOLMastery[];
  protected filteredMasteries!: LOLMastery[];
  protected championNomenclatures!: LOLChampionNomenclature[];

  constructor(protected imageService: RIOTImageService, protected formatService: FormatService, protected patchService: RIOTPatchService, private masteryService: LOLMasteryService) {
  }

  async ngOnChanges() {
    const masteries = await this.masteryService.getMasteries(this.summoner.puuid);
    this.allMasteries = masteries.champions.sort((a,b) => b.points - a.points);
    this.championNomenclatures = this.patchService.getLOLPatch(this.metadata.currentPatch)!.champions;
    this.filteredMasteries = this.allMasteries;
  }

  filterMasteries(): void {
    if (this.filter.trim() === '') {
      this.filteredMasteries = this.allMasteries;
    } else {
      this.filteredMasteries = this.allMasteries
        .filter(mastery => {
          return this.championNomenclatures.find(champion => champion.id === mastery.champion)?.name.toLowerCase().startsWith(this.filter.trim().toLowerCase())
        });
    }
  }

  resetFilter(): void {
    this.filter = '';
    this.filteredMasteries = this.allMasteries;
  }


  protected readonly Math = Math;
}
