import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'toggle-switch',
  templateUrl: './toggle-switch.component.html',
  styleUrls: ['./toggle-switch.component.css']
})
export class ToggleSwitchComponent {

  @Input() title!: string;
  @Input() checked!: boolean;
  @Output() toggle = new EventEmitter<boolean>();

}
