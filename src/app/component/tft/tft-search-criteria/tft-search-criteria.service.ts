import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TftSearchCriteriaService {

  static set: string;
  static queue: string;

  initQueue(queue: string): void {
    TftSearchCriteriaService.queue = queue;
  }

  initSet(set: string): void {
    TftSearchCriteriaService.set = set;
  }

}
