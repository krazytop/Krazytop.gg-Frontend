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

  async hasResponse(response: Response) {
    if (response.status == 500) {
      await this.alertService.processAlert({
        message: "",
        duration: 3000
      })
      return false;
    } else {
      return response.status != 204;
    }
  }
}
