import {Component, Input, OnChanges} from '@angular/core';
import {RIOTSummoner} from "../../../../model/riot/riot-summoner.model";
import {LOLMatch} from "../../../../model/lol/lol-match.model";
import {LOLMatchService} from "../../../../service/lol/lol-match.service";
import {RIOTMatch} from "../../../../model/riot/riot-match.model";

@Component({
  selector: 'lol-main-roles',
  templateUrl: './lol-main-roles.component.html',
  styleUrls: ['./lol-main-roles.component.css']
})
export class LolMainRolesComponent implements OnChanges {

  @Input() summoner!: RIOTSummoner;
  @Input({transform: (matches: RIOTMatch[]): LOLMatch[] => matches as LOLMatch[]}) matches!: LOLMatch[];

  roleResults: number[][] = [];
  sum = 1;
  image = ['top', 'jungle', 'middle', 'bottom', 'support'];

  constructor(private matchService: LOLMatchService) {
  }

  ngOnChanges() {
    this.roleResults = this.matchService.getRolesWinsAndLosses(this.matches, this.summoner);
    this.roleResults.pop();
    this.sum = Math.max(this.roleResults.reduce((sum, result) => sum + result[0] + result[1], 0), 1);
  }

  protected readonly Math = Math;
}
