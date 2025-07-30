import {Component, Input, OnChanges} from '@angular/core';
import {LOLArenaCompletionService} from "../../../../service/lol/lol-arena-completion.service";
import {RIOTPatchService} from "../../../../service/riot/riot-patch.service";
import {RIOTSummoner} from "../../../../model/riot/riot-summoner.model";
import {RIOTMetadata} from "../../../../model/riot/riot-metadata.model";
import {LOLArenaCompletion} from "../../../../model/lol/lol-arena-completion.model";
import {RIOTImageService} from "../../../../service/riot/riot-image.service";
import {LOLChampionNomenclature} from "../../../../model/lol/nomenclature/lol-champion.nomenclature";

@Component({
  selector: 'lol-arena-completion',
  templateUrl: './lol-arena-completion.component.html',
  styleUrls: ['./lol-arena-completion.component.css']
})
export class LolArenaCompletionComponent implements OnChanges {

  @Input() summoner!: RIOTSummoner;
  @Input() metadata!: RIOTMetadata;

  protected arenaCompletion?: LOLArenaCompletion;
  protected allChampions: LOLChampionNomenclature[] = [];
  protected filteredChampions: LOLChampionNomenclature[] = [];
  protected filter: string = "";

  constructor(protected imageService: RIOTImageService, private arenaCompletionService: LOLArenaCompletionService, protected patchService: RIOTPatchService) {
  }

  isCompleted(championId: string) {
    return this.arenaCompletion?.champions.find(c => c === championId);
  }

  async ngOnChanges() {
    this.arenaCompletion = await this.arenaCompletionService.getArenaCompletion(this.summoner.puuid);
    this.allChampions = this.patchService.getLOLPatch(this.metadata.currentPatch)!.champions
      .sort((a, b) => {
        const isA = this.isCompleted(a.id);
        const isB = this.isCompleted(b.id);
        if (isA && !isB) {
          return -1;
        } else if (isB && !isA) {
          return 1;
        } else {
          return 0;
        }
      });
    this.filteredChampions = this.allChampions;
  }

  filterChampions(): void {
    if (this.filter.trim() === '') {
      this.filteredChampions = this.allChampions;
    } else {
      this.filteredChampions = this.allChampions
        .filter(champion => champion.name.toLowerCase().startsWith(this.filter.trim().toLowerCase()));
    }
  }

  resetFilter(): void {
    this.filter = '';
    this.filteredChampions = this.allChampions;
  }

}
