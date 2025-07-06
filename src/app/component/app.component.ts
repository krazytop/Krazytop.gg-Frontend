import {Component, OnInit} from '@angular/core';
import {AlertModel} from "../model/alert.model";
import {AlertService} from "./alert/alert.service";
import {LanguageService} from "../service/language.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  alert?: AlertModel;
  appIsReady: boolean = false;

  constructor(private alertService: AlertService, private languageService: LanguageService) {
  }

  ngOnInit() {
    this.alertService.setAppComponent(this);
    this.languageService.getAllSupportedLanguages().then(() => {
      this.languageService.initAppLanguage();
      this.appIsReady = true
    });
  }

  cancelAlert() {
    this.alertService.cancelAlert();
  }

}
