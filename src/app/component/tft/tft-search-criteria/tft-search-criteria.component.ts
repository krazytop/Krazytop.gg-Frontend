import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {RIOTSummoner} from "../../../model/riot/riot-summoner.model";

@Component({
  selector: 'tft-search-criteria',
  templateUrl: './tft-search-criteria.component.html',
  styleUrls: ['./tft-search-criteria.component.css']
})
export class TftSearchCriteriaComponent {

  @Input() summoner!: RIOTSummoner;
  @Input() selectedQueue!: string;
  @Input() selectedSet!: string;

  queues: string[] = ['all-queues', 'normal', 'ranked', 'double-up', 'hyper-roll'];
  sets: string[] = ['set-7', 'set-8', 'set-9', 'set-10', 'set-11', 'set-12', 'set-13', 'set-14'];

  constructor(private router: Router) {
  }

  selectQueue(queue: string) {
    this.router.navigate([`/tft/${this.summoner.region}/${this.summoner.tag}/${this.summoner.name}/${queue}/${this.selectedSet}`]);
  }

  selectSet(set: string) {
    this.router.navigate([`/tft/${this.summoner.region}/${this.summoner.tag}/${this.summoner.name}/${this.selectedQueue}/${set}`]);
  }

  formatQueueAndSetName(queue: string) {
    return queue.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }


}
