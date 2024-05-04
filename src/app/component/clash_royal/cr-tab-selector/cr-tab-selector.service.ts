import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CrTabSelectorService {

  static tab: string;

  initTab(tab: string): void {
    CrTabSelectorService.tab = tab;
  }

}
