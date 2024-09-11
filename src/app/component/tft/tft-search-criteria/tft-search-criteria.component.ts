import {Component, Input, OnChanges, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TftSearchCriteriaService} from "./tft-search-criteria.service";
import {RIOTSummoner} from "../../../model/riot/riot-summoner.model";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'tft-search-criteria',
  templateUrl: './tft-search-criteria.component.html',
  styleUrls: ['./tft-search-criteria.component.css']
})
export class TftSearchCriteriaComponent implements OnChanges {

  @Input() summoner: RIOTSummoner = new RIOTSummoner();
  @ViewChild('setSelectionForm') setSelectionForm!: NgForm;

  static all: string = 'all';
  static soloRanked: string = 'solo-ranked';
  static hyperRoll: string = 'hyper-roll';
  static doubleUp: string = 'double-up';
  static normal: string = 'normal';

  availableSets: string[] = ['Set 9.5', 'Set 9', 'Set 8.5', 'Set 8'];
  selectedSet: string = 'Set 9';

  protected readonly TftSearchCriteriaComponent = TftSearchCriteriaComponent;
  protected readonly TftSearchCriteriaService = TftSearchCriteriaService;

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnChanges() {
    this.route.params.subscribe(params => {
      const setUrl = params['set'];
      this.selectedSet = setUrl.replace('s','S').replace('_',' ').replace('-','.');
    });
  }

  selectQueue(queue: string) {
    this.route.params.subscribe(params => {
      const set = params['set'];
      if (queue != "all") {
        this.router.navigate([`/tft/${this.summoner.region}/${this.summoner.name}/${set}/${queue}`]);
      } else {
        this.router.navigate([`/tft/${this.summoner.region}/${this.summoner.name}/${set}`]);
      }
    });
  }

  selectSet() {
    this.route.params.subscribe(params => {
      const set = this.setSelectionForm.value.set;
      const setUrl = set.replace('S','s').replace(' ','_').replace('.','-');
      const queue = params['queue'];
      if (queue != undefined) {
        this.router.navigate([`/tft/${this.summoner.region}/${this.summoner.name}/${setUrl}/${queue}`]);
      } else {
        this.router.navigate([`/tft/${this.summoner.region}/${this.summoner.name}/${setUrl}`]);
      }
    });
  }

}
