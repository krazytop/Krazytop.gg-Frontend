import {Component, Input} from '@angular/core';
import {DestinyUrlArgs} from "../../../model/destiny/destiny-url-args";

@Component({
  selector: 'destiny-component-selector',
  templateUrl: './destiny-component-selector.component.html',
  styleUrls: ['./destiny-component-selector.component.css']
})
export class DestinyComponentSelectorComponent {

  @Input() urlArgs!: DestinyUrlArgs;

  static vendors: string = 'vendors';
  static collections: string = 'collections';
  static badges: string = 'badges';
  static titles: string = 'titles';
  static characters: string = 'characters';
  static catalysts: string = 'catalysts';
  static models: string = 'models';
  static questsAndContracts: string = 'quests-and-contracts';
  static guardianRanks: string = 'guardian-ranks';

  get raidReportUrl() {
    return `https://raid.report/${this.getRaidReportPlatform}/${this.urlArgs.membership}`;
  }

  get dungeonReportUrl() {
    return `https://dungeon.report/${this.getRaidReportPlatform}/${this.urlArgs.membership}`;
  }

  get getRaidReportPlatform() {
    return {1: 'xb', 2: 'ps'}[this.urlArgs.platform] || 'pc';
  }

  protected readonly DestinyComponentSelectorComponent = DestinyComponentSelectorComponent;

}
