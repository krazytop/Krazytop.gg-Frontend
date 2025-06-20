import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'request-button',
  templateUrl: './request-button.component.html',
  styleUrls: ['./request-button.component.css']
})
export class RequestButtonComponent {

  @Input() loading!: boolean;
  @Input() nextAllowedRequestDate: Date = new Date();
  @Input() title!: string;
  @Output() request = new EventEmitter();

  get currentDate() {
    return new Date();
  }

}
