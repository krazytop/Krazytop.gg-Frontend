import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {

  private static headers: { [key: string]: string } = {
    'Authorization' : 'Basic ' + btoa('krazytop' + ':' + 'password')
  };

  static getHeaders(): { [key: string]: string } {
    return HeaderService.headers;
  }
}
