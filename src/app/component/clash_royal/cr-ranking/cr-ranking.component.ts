import {Component, Input, OnInit} from '@angular/core';
import {CRPlayer} from "../../../model/clash-royal/cr-player.model";

@Component({
  selector: 'cr-ranking',
  templateUrl: './cr-ranking.component.html',
  styleUrls: ['./cr-ranking.component.css']
})
export class CrRankingComponent {

  @Input() isParentComponentReady: boolean = false;
  @Input() player: CRPlayer = new CRPlayer();

}
