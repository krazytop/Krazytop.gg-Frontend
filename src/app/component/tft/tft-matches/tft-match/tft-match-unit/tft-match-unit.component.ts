import {Component, Input, OnInit} from '@angular/core';
import {TFTUnit} from "../../../../../model/tft/tft-unit.model";

@Component({
  selector: 'tft-match-unit',
  templateUrl: './tft-match-unit.component.html',
  styleUrls: ['./tft-match-unit.component.css']
})
export class TftMatchUnitComponent implements OnInit {

  @Input() unit!: TFTUnit;

  ngOnInit(): void {
    this.setUnitName();
  }

  setUnitName() {
    this.unit.name = this.unit.id.split('_')[1];
  }

}
