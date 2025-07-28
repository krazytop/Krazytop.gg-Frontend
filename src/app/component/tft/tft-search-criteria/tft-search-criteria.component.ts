import {Component, Input, OnChanges} from '@angular/core';
import {Router} from "@angular/router";
import {RIOTSummoner} from "../../../model/riot/riot-summoner.model";

@Component({
  selector: 'tft-search-criteria',
  templateUrl: './tft-search-criteria.component.html',
  styleUrls: ['./tft-search-criteria.component.css']
})
export class TftSearchCriteriaComponent implements OnChanges {

  @Input() summoner!: RIOTSummoner;
  @Input() selectedQueue!: string;
  @Input() selectedSet!: string;
  @Input() currentSet!: number;

  queues: string[] = ['all-queues', 'normal', 'ranked', 'double-up', 'hyper-roll'];
  sets: string[] = [];

  constructor(private router: Router) {
  }

  ngOnChanges() {
    const playedSets = this.summoner.playedSeasonsOrSets.sort((a,b) => b-a);
    if (!playedSets.includes(this.currentSet)) {
      playedSets.push(this.currentSet)
    }
    playedSets.sort((a,b) => b - a);
    this.sets = playedSets.map(set => `set-${set}`)
  }

  redirect() {
    this.router.navigate([`/tft/${this.summoner.region}/${this.summoner.tag}/${this.summoner.name}/${this.selectedQueue}/${this.selectedSet}`]);
  }

}
