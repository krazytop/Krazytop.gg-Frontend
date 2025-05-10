import {Component, Input} from '@angular/core';
import {DestinyObjectiveNomenclature} from "../../../model/destiny/nomenclature/destiny-objective.nomenclature";
import {DestinyObjectiveService} from "../../../service/destiny/destiny-objective.service";
import {DestinyObjectiveProgressModel} from "../../../model/destiny/destiny-objective-progress.model";

@Component({
  selector: 'destiny-simple-objective',
  templateUrl: './destiny-simple-objective.component.html',
  styleUrls: ['./destiny-simple-objective.component.css']
})
export class DestinySimpleObjectiveComponent {

  @Input() objective!: DestinyObjectiveProgressModel;
  @Input() nomenclature!: DestinyObjectiveNomenclature;
  @Input() areAllObjectivesCompleted!: boolean;

  constructor(protected objectiveService: DestinyObjectiveService) {
  }

}
