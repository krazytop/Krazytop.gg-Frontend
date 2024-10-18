import {Component} from '@angular/core';
import {DestinyCharacterItemFiltersService} from "../../../../service/destiny/destiny-character-item-filters.service";

@Component({
  selector: 'destiny-character-item-filters',
  templateUrl: './destiny-character-item-filters.component.html',
  styleUrls: ['./destiny-character-item-filters.component.css']
})
export class DestinyCharacterItemFiltersComponent {

  constructor(protected characterItemFiltersService: DestinyCharacterItemFiltersService) {
  }

  showFilters: boolean = false;


}
