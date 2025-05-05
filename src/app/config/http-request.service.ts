import {Injectable} from '@angular/core';
import {AlertService} from "../component/alert/alert.service";

@Injectable({
  providedIn: 'root',
})
export class HTTPRequestService {

  constructor(private alertService: AlertService) {
  }

  static getBackendHeaders(): { [key: string]: string } {
    return {'Authorization' : 'Basic ' + btoa('krazytop' + ':' + 'password')};
  }

  async hasResponse(response: Response, showAlert: boolean = true) {//TODO
    if (response.status === 500 || response.status === 404) {
      if (showAlert) {
        this.alertService.processAlert({
          message: "",
          duration: 3000
        })
      }
      return false;
    } else {
      return response.status === 200;
    }
  }
}
