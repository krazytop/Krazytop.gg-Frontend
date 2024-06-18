import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  private static instance: HeaderService;

  private headers: { [key: string]: string } = {};

  constructor() {
    console.log("init HeaderService")
    if (!HeaderService.instance) {
      HeaderService.instance = this;
    }

    const username = 'krazytop';
    const password = 'password';
    const base64Credentials = btoa(username + ':' + password);
    this.headers['Authorization'] = 'Basic ' + base64Credentials;

    return HeaderService.instance;
  }

  static getHeaders(): { [key: string]: string } {
    if (HeaderService.instance) {
      return HeaderService.instance.headers;
    } else {
      throw new Error('HeaderService not initialized.');
    }
  }
}
