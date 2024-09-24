import {Component, Input} from '@angular/core';
import {RIOTSummoner} from "../../../model/riot/riot-summoner.model";
import {Router} from "@angular/router";

@Component({
  selector: 'lol-search-criteria',
  templateUrl: './lol-search-criteria.component.html',
  styleUrls: ['./lol-search-criteria.component.css']
})
export class LolSearchCriteriaComponent {

  @Input() summoner!: RIOTSummoner;
  @Input() selectedQueue!: string;
  @Input() selectedRole!: string;

  queues: string[] = ['all-queues', 'normal', 'solo-ranked', 'flex-ranked', 'aram', 'urf', 'nexus-blitz', 'one-for-all', 'ultimate-spellbook', 'arena'];
  roles: string[] = ['all-roles', 'top', 'jungle', 'middle', 'bottom', 'support'];

  constructor(private router: Router) {
  }

  selectQueue(queue: string) {
    this.router.navigate([`/lol/${this.summoner.region}/${this.summoner.tag}/${this.summoner.name}/${queue}/${this.selectedRole}`]);
  }

  selectRole(role: string) {
    this.router.navigate([`/lol/${this.summoner.region}/${this.summoner.tag}/${this.summoner.name}/${this.selectedQueue}/${role}`]);
  }

  formatQueueName(queue: string) {
    return queue.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

}
