import {Component, Input} from '@angular/core';
import {CRCard} from "../../../model/clash-royal/cr-card.model";

@Component({
  selector: 'cr-cards',
  templateUrl: './cr-cards.component.html',
  styleUrls: ['./cr-cards.component.css']
})
export class CrCardsComponent {

  @Input() cards: CRCard[] = [];

  getCardImageUrl(card: CRCard) {
    return `https://royaleapi.github.io/cr-api-assets/cards/${card.nomenclature.image}`;
  }

  getOrderedCardsByLevel(cards: CRCard[]) {
    return cards
      .filter(card => card.nomenclature)
      .sort((a, b) => {
        if (a.level < b.level) return 1;
        if (a.level > b.level) return -1;
        if (a.count < b.count) return 1;
        if (a.count > b.count) return -1;
        return 0;

      });
  }

  protected readonly console = console;
}
