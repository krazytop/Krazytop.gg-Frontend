import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LOLSearchCriteriaService {

  static queue: string;
  static role: string;

  initQueue(queue: string): void {
    LOLSearchCriteriaService.queue = queue;
  }

  initRole(role: string): void {
    LOLSearchCriteriaService.role = role;
  }

}
