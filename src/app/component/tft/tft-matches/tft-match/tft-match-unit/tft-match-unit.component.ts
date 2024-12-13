import {Component, Input} from '@angular/core';
import {TFTUnit} from "../../../../../model/tft/tft-unit.model";

@Component({
  selector: 'tft-match-unit',
  templateUrl: './tft-match-unit.component.html',
  styleUrls: ['./tft-match-unit.component.css']
})
export class TftMatchUnitComponent {

  @Input() unit!: TFTUnit;
}
