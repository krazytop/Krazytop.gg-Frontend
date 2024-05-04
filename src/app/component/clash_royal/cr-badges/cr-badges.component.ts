import {Component, Input} from '@angular/core';
import {CRBadge} from "../../../model/clash-royal/cr-badge.model";

@Component({
  selector: 'cr-badges',
  templateUrl: './cr-badges.component.html',
  styleUrls: ['./cr-badges.component.css']
})
export class CrBadgesComponent {

  @Input() isParentComponentReady: boolean = false;
  @Input() badges: CRBadge[] = [];

  getMasteriesBadges() {
    let masteriesBadges: CRBadge[] = [];
    for (let badge of this.badges){
      if (badge.name?.includes('Mastery')) {
        masteriesBadges.push(badge);
      }
    }
    return masteriesBadges.sort((a, b) => b.level! - a.level!);
  }

  getSuccessBadges() {
    let succesBadges: CRBadge[] = [];
    for (let badge of this.badges){
      if (!badge.name?.includes('Mastery')) {
        succesBadges.push(badge);
      }
    }
    return succesBadges;
  }

}
