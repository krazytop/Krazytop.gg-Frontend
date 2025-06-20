import {Injectable} from "@angular/core";
import {CustomTranslateService} from "./custom-translate.service";

@Injectable({ providedIn: 'root' })
export class TimeService {

  andTranslation: string = 'and';

  constructor(private customTranslateService: CustomTranslateService) {
    customTranslateService.translateService.get('GENERAL.AND').subscribe(translation => {
      this.andTranslation = translation;
    })
  }

  public stringifyDateRelativeToNow(date: Date, numberOfUnits: number = 1, onlyShowInitial: boolean = false): string {
    return this.stringifyTimestamp( Math.floor(Math.abs(new Date(date).getTime() - Date.now()) / 1000), numberOfUnits, onlyShowInitial);
  }

  public stringifyTimestamp(timestamp: number, numberOfUnits: number = 1, onlyShowInitial: boolean = false): string {

    const units = [
      { singularName: 'YEAR', pluralName: 'YEARS', seconds: 365 * 24 * 60 * 60 },
      { singularName: 'MONTH', pluralName: 'MONTHS', seconds: 30 * 24 * 60 * 60 },
      { singularName: 'DAY', pluralName: 'DAYS', seconds: 24 * 60 * 60 },
      { singularName: 'HOUR', pluralName: 'HOURS', seconds: 60 * 60 },
      { singularName: 'MINUTE', pluralName: 'MINUTES', seconds: 60 },
      { singularName: 'SECOND', pluralName: 'SECONDS', seconds: 1 }
    ];
    let timeTab: string[] = [];
    for (const unit of units) {
      if (numberOfUnits > 0) {
        const elapsed = Math.floor(timestamp / unit.seconds);
        if (elapsed > 0) {
          numberOfUnits --;
          this.customTranslateService.translateService.get(`TIME.${elapsed > 1 ? unit.pluralName : unit.singularName}`).subscribe(unitTranslation => {
            timeTab.push(`${elapsed}${onlyShowInitial ? unitTranslation[0] : ' ' + unitTranslation}`);
          });
        }
        timestamp -= elapsed * unit.seconds;
      }
    }
    if (timeTab.length === 0) {
      let zero = '0';
      this.customTranslateService.translateService.get('TIME.SECOND').subscribe((translation: string) => {
        zero += onlyShowInitial ? translation[0] : ' ' + translation;
      });
      return zero;
    }
    else if (timeTab.length === 1) return timeTab[0].toLowerCase();
    else return `${timeTab.slice(0, -1).join(onlyShowInitial ? ' ' : ', ')}${onlyShowInitial ? '' : ' ' + this.andTranslation} ${timeTab[timeTab.length - 1]}`.toLowerCase();
  }

  getSecondsUntil(date: Date) {
    return Math.max(date.getTime() - Date.now(), 0) / 1000;
  }

}
