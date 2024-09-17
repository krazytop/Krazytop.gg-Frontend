import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {

  static getBackendHeaders(): { [key: string]: string } {
    return {'Authorization' : 'Basic ' + btoa('krazytop' + ':' + 'password')};
  }
}
