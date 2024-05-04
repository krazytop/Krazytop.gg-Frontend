import {Component, Input, ViewChild} from '@angular/core';
import {CRPlayer} from "../../../model/clash-royal/cr-player.model";
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {GameService} from "../../game-list/game.service";
import {CrTabSelectorService} from "./cr-tab-selector.service";

@Component({
  selector: 'cr-tab-selector',
  templateUrl: './cr-tab-selector.component.html',
  styleUrls: ['./cr-tab-selector.component.css']
})
export class CrTabSelectorComponent {

  @Input() player: CRPlayer = new CRPlayer();
  @ViewChild('setSelectionForm') setSelectionForm!: NgForm;

  static battles: string = 'battles';
  static cards: string = 'cards';
  static chests: string = 'chests';
  static badges: string = 'badges';

  protected readonly CrTabSelectorComponent = CrTabSelectorComponent;

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  selectTab(tab: string) {
    this.route.params.subscribe(params => {
      this.router.navigate([`/${GameService.game}/${this.player.id}/${tab}`]);
      });
  }

  protected readonly CrTabSelectorService = CrTabSelectorService;
}
