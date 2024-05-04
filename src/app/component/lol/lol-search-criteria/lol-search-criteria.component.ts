import {Component, Input} from '@angular/core';
import {RIOTSummoner} from "../../../model/riot/riot-summoner.model";
import {ActivatedRoute, Router} from "@angular/router";
import {GameService} from "../../game-list/game.service";
import {LOLSearchCriteriaService} from "./lol-search-criteria.service";

@Component({
  selector: 'lol-search-criteria',
  templateUrl: './lol-search-criteria.component.html',
  styleUrls: ['./lol-search-criteria.component.css']
})
export class LolSearchCriteriaComponent {

  @Input() summoner: RIOTSummoner = new RIOTSummoner();

  static allQueues: string = 'all-queues';
  static normal: string = 'normal';
  static soloRanked: string = 'solo-ranked';
  static flexRanked: string = 'flex-ranked';
  static aram: string = 'aram';
  static quickPlay: string = 'quick-play';

  static allRoles: string = 'all-roles';
  static top: string = 'top';
  static jungle: string = 'jungle';
  static middle: string = 'middle';
  static bottom: string = 'bottom';
  static support: string = 'support';

  protected readonly LolSearchCriteriaComponent = LolSearchCriteriaComponent;
  protected readonly LOLSearchCriteriaService = LOLSearchCriteriaService;

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  selectQueue(queue: string) {
    this.route.params.subscribe(() => {
      this.router.navigate([`/${GameService.game}/${this.summoner.region}/${this.summoner.tag}/${this.summoner.name}/${queue}/${LOLSearchCriteriaService.role}`]);
    });
  }

  selectRole(role: string) {
    this.route.params.subscribe(() => {
      this.router.navigate([`/${GameService.game}/${this.summoner.region}/${this.summoner.tag}/${this.summoner.name}/${LOLSearchCriteriaService.queue}/${role}`]);
    });
  }

}
