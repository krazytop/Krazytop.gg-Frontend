import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HeaderService} from "../config/headers.service";
import {AlertModel} from "../model/alert.model";
import {AlertService} from "./alert/alert.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  //apiKey: string = '';
  alert?: AlertModel;

  constructor(private http: HttpClient, private headers: HeaderService, private alertService: AlertService) {
  }

  ngOnInit() {
    this.alertService.setAppComponent(this);
    /*
    this.http.get<string>('http://localhost:8080/riot/api-key', {headers: HeaderService.getHeaders(),}).subscribe(apiKey => {
      this.apiKey = apiKey;
    });
    */
  }

  cancelAlert() {
    this.alertService.cancelAlert();
  }



}
