import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'request-button',
  templateUrl: './request-button.component.html',
  styleUrls: ['./request-button.component.css']
})
export class RequestButtonComponent {

  @Input() loading!: boolean;
  @Input() nextAllowedRequest: number = 0;
  @Input() title!: string;
  @Output() request = new EventEmitter();

}
