import {Component, Input} from '@angular/core';
import {CRChest} from "../../../model/clash-royal/cr-chest.model";

@Component({
  selector: 'cr-chests',
  templateUrl: './cr-chests.component.html',
  styleUrls: ['./cr-chests.component.css']
})
export class CrChestsComponent {

  @Input() upcomingChests: CRChest[] = [];

}
