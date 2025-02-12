import {Component, Input} from '@angular/core';
import {CRArenaNomenclature} from "../../../model/clash-royal/nomenclature/cr-arena.nomenclature";
import {CRTrophies} from "../../../model/clash-royal/cr-trophies.model";
import {CRLeagues} from "../../../model/clash-royal/cr-leagues.model";

@Component({
  selector: 'cr-ranking',
  templateUrl: './cr-ranking.component.html',
  styleUrls: ['./cr-ranking.component.css']
})
export class CrRankingComponent {

  @Input() seasonsLeagues!: CRLeagues;
  @Input() seasonsTrophies!: CRTrophies;
  @Input() arena!: CRArenaNomenclature;

  getArenaImageUrl(image: string) {
    return `https://cdn.royaleapi.com/static/img/arenas/512x512/${image}`;
  }

}
