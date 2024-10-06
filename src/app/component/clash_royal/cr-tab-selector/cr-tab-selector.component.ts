import {Component, Input} from '@angular/core';
import {CRPlayer} from "../../../model/clash-royal/cr-player.model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'cr-tab-selector',
  templateUrl: './cr-tab-selector.component.html',
  styleUrls: ['./cr-tab-selector.component.css']
})
export class CrTabSelectorComponent {

  @Input() player: CRPlayer = new CRPlayer();
  @Input() component!: string;

  static readonly battles: string = 'battles';
  static readonly cards: string = 'cards';
  static readonly chests: string = 'chests';
  static readonly badges: string = 'badges';

  protected readonly CrTabSelectorComponent = CrTabSelectorComponent;

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  selectComponent(toComponent: string) {
    this.route.params.subscribe(() => {
      this.router.navigate([`/clash-royal/${this.player.id}/${toComponent}`]);
      });
  }

}
