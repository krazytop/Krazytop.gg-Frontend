import {Component, Input} from '@angular/core';

@Component({
  selector: 'progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent {

  @Input() description?: string;
  @Input() progressValue!: number;
  @Input() completionValue!: number;
  @Input() allProgressAreCompleted: boolean = true;

  protected readonly Math = Math;
}
