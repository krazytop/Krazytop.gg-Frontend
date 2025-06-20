import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HTTPRequestService} from "../config/http-request.service";
import {AlertModel} from "../model/alert.model";
import {AlertService} from "./alert/alert.service";
import {CustomTranslateService} from "../service/custom-translate.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  alert?: AlertModel;

  constructor(private alertService: AlertService) {
  }

  ngOnInit() {
    this.alertService.setAppComponent(this);
  }

  cancelAlert() {
    this.alertService.cancelAlert();
  }

}
