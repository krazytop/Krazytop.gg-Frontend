import {Component, Input} from '@angular/core';
import {TFTUnit} from "../../../../model/tft/tft-unit.model";
import {RIOTImageService} from "../../../../service/riot/riot-image.service";

@Component({
  selector: 'tft-match-unit',
  templateUrl: './tft-match-unit.component.html',
  styleUrls: ['./tft-match-unit.component.css']
})
export class TftMatchUnitComponent {

  @Input() unit!: TFTUnit;
  @Input() matchVersion!: string;

  constructor(protected imageService: RIOTImageService) {
  }

  protected readonly console = console;
}
