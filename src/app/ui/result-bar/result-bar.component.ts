import {Component, Input} from '@angular/core';

@Component({
  selector: 'result-bar',
  templateUrl: './result-bar.component.html',
  styleUrls: ['./result-bar.component.css']
})
export class ResultBarComponent {

  @Input() winsAndLosses!: number[];

  getWinRate(): string {
    const [wins, losses] = this.winsAndLosses;
    return (wins / (wins + losses) * 100).toFixed(0);
  }
}
