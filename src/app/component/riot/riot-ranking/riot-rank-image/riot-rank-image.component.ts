import {Component, Input} from '@angular/core';
import {RIOTRankInformations} from "../../../../model/riot/riot-rank.model";

@Component({
  selector: 'riot-rank-image',
  templateUrl: './riot-rank-image.component.html',
  styleUrls: ['./riot-rank-image.component.css']
})
export class RiotRankImageComponent {

  @Input() rank?: RIOTRankInformations;
  @Input() radius!: number;

}
