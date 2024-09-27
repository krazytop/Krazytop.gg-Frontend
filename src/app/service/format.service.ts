import {Injectable} from "@angular/core";

@Injectable({ providedIn: 'root' })
export class FormatService {//TODO time update summoner / datetime match

  formatByThousands(nb: number) {
    let formatString = "";
    let index = 0;
    for(let digit of nb.toString().split('').reverse().join('')) {
      if (index === 3) {
        index = 1;
        formatString += " " + digit;
      } else {
        index++;
        formatString += digit;
      }
    }
    return formatString.split('').reverse().join('');
  }
}
