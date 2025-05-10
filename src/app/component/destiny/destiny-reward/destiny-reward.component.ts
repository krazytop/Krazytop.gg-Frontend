import {Component, Input} from '@angular/core';
import {DestinyRewardModel} from "../../../model/destiny/destiny-reward.model";
import {DestinyComponent} from "../destiny.component";

@Component({
  selector: 'destiny-reward',
  templateUrl: './destiny-reward.component.html',
  styleUrls: ['./destiny-reward.component.css']
})
export class DestinyRewardComponent {

  @Input() item!: DestinyRewardModel;

  getSafeString(name: string) {
    return name.replace(/x \{.*}/, '');
  }
  protected readonly DestinyComponent = DestinyComponent;
}
