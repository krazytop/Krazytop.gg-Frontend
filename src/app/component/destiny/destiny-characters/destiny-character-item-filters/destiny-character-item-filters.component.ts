import {Component} from '@angular/core';
import {DestinyCharacterItemFiltersService} from "../../../../service/destiny/destiny-character-item-filters.service";

@Component({
  selector: 'destiny-character-item-filters',
  templateUrl: './destiny-character-item-filters.component.html',
  styleUrls: ['./destiny-character-item-filters.component.css']
})
export class DestinyCharacterItemFiltersComponent {

  constructor(protected filterService: DestinyCharacterItemFiltersService) {
  }

  showFilters: boolean = false;

  resetRarityFilters() {
    this.filterService.rarityFilters = {
      basic: false,
      ordinary: false,
      uncommon: false,
      legendary: false,
      exotic: false
    };
  }

  resetDamageTypeFilters() {
    this.filterService.damageTypeFilters = {
      kinetic: false,
      thermal: false,
      arc: false,
      void: false,
      stasis: false,
      strand: false
    };
  }
}
