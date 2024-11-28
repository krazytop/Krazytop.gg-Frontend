import {Injectable} from "@angular/core";

@Injectable({ providedIn: 'root' })
export class TimeService {

  public getStringTimeFromMs(timeFrom: number): string {
    const now = Date.now();
    let elapsedMilliseconds = now - timeFrom;

    const units = [
      { name: 'year', milliseconds: 365 * 24 * 60 * 60 * 1000 },
      { name: 'month', milliseconds: 30 * 24 * 60 * 60 * 1000 },
      { name: 'day', milliseconds: 24 * 60 * 60 * 1000 },
      { name: 'hour', milliseconds: 60 * 60 * 1000 },
      { name: 'minute', milliseconds: 60 * 1000 },
      { name: 'second', milliseconds: 1000 }
    ];
    for (const unit of units) {
      const elapsed = Math.floor(elapsedMilliseconds / unit.milliseconds);
      if (elapsed > 0) {
        return `${elapsed} ${unit.name}${elapsed > 1 ? 's' : ''} ago`;
      }
      elapsedMilliseconds -= elapsed * unit.milliseconds;
    }
    return '';
  }

  formatTimeMinSec(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time - minutes * 60);
    return minutes.toString().padStart(2, '0') + 'm ' + seconds.toString().padStart(2, '0') + 's';
  }

  formatTimeOptMinSec(time: number): string {
    if (time < 60) {
      return `${time}s`;
    } else {
      const minutes = Math.floor(time / 60);
      const remainingSeconds = time % 60;
      return `${minutes}min ${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}s`;
    }
  }

  getSecondsRemainingUntilNextAllowedUpdate(date: Date, updateFrequency: number) { //TODO
    const elapsedTimeInSeconds = (new Date().getTime() - new Date(date).getTime()) / 1000;
    return Math.floor(Math.max(0, updateFrequency - elapsedTimeInSeconds + 1));
  }

}
