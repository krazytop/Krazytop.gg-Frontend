import { Injectable } from '@angular/core';
import {AlertModel} from "../../model/alert.model";
import {AppComponent} from "../app.component";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private appComponent: AppComponent | undefined;

  isProcessing: boolean = false;
  waitingAlerts: AlertModel[] = [];
  private cancelAlertSubject = new Subject<boolean>();

  setAppComponent(appComponent: AppComponent) {
    this.appComponent = appComponent;
  }

  cancelAlert() {
    this.cancelAlertSubject.next(true);
  }

  processAlert(alert: AlertModel): Promise<void> {
    return new Promise((resolve) => {
      if (this.isProcessing) {
        if (this.waitingAlerts.length < 10) {
          this.waitingAlerts.push(alert);
        }
      } else {
        this.isProcessing = true;
        this.processIndividualAlert(alert)
          .then(() => {
            this.isProcessing = false;
            resolve();
            this.processWaitingAlerts();
          });
      }
    });
  }

  private processWaitingAlerts(): void {
    if (!this.isProcessing && this.waitingAlerts.length > 0) {
      const nextAlert = this.waitingAlerts.shift();
      this.processAlert(nextAlert!)
        .then(() => {
          this.isProcessing = false;
        });
    }
  }

  private processIndividualAlert(alert: AlertModel): Promise<void> {
    this.appComponent!.alert = alert;
    const duration = alert.duration;
    return new Promise((resolve) => {
      const timeoutId = setTimeout(() => {
        this.appComponent!.alert = undefined;
        setTimeout(() => resolve(), 100);
      }, duration);

      const conditionSubscription = this.cancelAlertSubject.asObservable().subscribe(cancelAlert => {
        if (cancelAlert) {
          conditionSubscription.unsubscribe();
          clearTimeout(timeoutId);
          this.appComponent!.alert = undefined;
          this.cancelAlertSubject.next(false);
          setTimeout(() => resolve(), 100);
        }
      });
    });
  }


}
