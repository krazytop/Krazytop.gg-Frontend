import {Injectable} from '@angular/core';
import {LolSearchCriteriaComponent} from "./lol-search-criteria.component";

@Injectable({
  providedIn: 'root',
})
export class LOLSearchCriteriaService {

  private allQueues: string = "ALL_QUEUES";
  private normal: string = "DRAFT";
  private quickPlay: string = "QUICKPLAY";
  private soloRanked: string = "SOLO_RANKED";
  private flexRanked: string = "FLEX_RANKED";
  private aram: string = "ARAM";

  private allRoles: string = 'ALL_ROLES';
  private top: string = 'TOP';
  private jungle: string = 'JUNGLE';
  private middle: string = 'MIDDLE';
  private bottom: string = 'BOTTOM';
  private support: string = 'UTILITY';

  static queue: string;
  static role: string;

  initQueue(queue: string): void {
    LOLSearchCriteriaService.queue = queue;
  }

  initRole(role: string): void {
    LOLSearchCriteriaService.role = role;
  }

  getFormattedQueue(queue: string): string {
    if (queue === LolSearchCriteriaComponent.soloRanked) {
      return this.soloRanked;
    } else if (queue === LolSearchCriteriaComponent.flexRanked) {
      return this.flexRanked;
    } else if (queue === LolSearchCriteriaComponent.normal) {
      return this.normal;
    } else if (queue === LolSearchCriteriaComponent.aram) {
      return this.aram;
    } else if (queue === LolSearchCriteriaComponent.quickPlay) {
      return this.quickPlay;
    } else if (queue === LolSearchCriteriaComponent.allQueues) {
      return this.allQueues;
    } else {
      return "";
    }
  }

  getFormattedRole(role: string): string {
    if (role === LolSearchCriteriaComponent.top) {
      return this.top;
    } else if (role === LolSearchCriteriaComponent.jungle) {
      return this.jungle;
    } else if (role === LolSearchCriteriaComponent.middle) {
      return this.middle;
    } else if (role === LolSearchCriteriaComponent.bottom) {
      return this.bottom;
    } else if (role === LolSearchCriteriaComponent.support) {
      return this.support;
    } else if (role === LolSearchCriteriaComponent.allRoles) {
      return this.allRoles;
    } else {
      return "";
    }
  }
}
