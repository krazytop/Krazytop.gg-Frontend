import {AfterViewInit, Component, Input} from '@angular/core';
import {AlertModel} from "../../model/alert.model";

@Component({
  selector: 'alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements AfterViewInit {

  @Input() alert!: AlertModel;

  ngAfterViewInit() {
    this.showLoading();
  }

  showLoading() {
    const loadingElement = document.getElementById('loading')!;
    const initialWidth = loadingElement.offsetWidth;
    const targetWidth = 0;
    const intervalTime = 10;

    const stepWidth = (initialWidth - targetWidth) / (this.alert.duration / intervalTime);

    let currentWidth = initialWidth;
    const interval = setInterval(() => {
      currentWidth -= stepWidth;
      loadingElement.style.width = currentWidth + 'px';

      if (currentWidth <= 0) {
        clearInterval(interval);
        loadingElement.style.width = '0px';
      }
    }, intervalTime);
  }



}
