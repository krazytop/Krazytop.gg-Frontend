import {Component, Input} from '@angular/core';
import {CRPlayer} from "../../../model/clash-royal/cr-player.model";

@Component({
  selector: 'cr-tab-selector',
  templateUrl: './cr-tab-selector.component.html',
  styleUrls: ['./cr-tab-selector.component.css']
})
export class CrTabSelectorComponent {

  @Input() player!: CRPlayer;
  @Input() component!: string;

  static readonly cards: string = 'cards';
  static readonly chests: string = 'chests';
  static readonly badges: string = 'badges';

  protected readonly CrTabSelectorComponent = CrTabSelectorComponent;

}
