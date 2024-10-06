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
      .sort((a, b) => b.level! - a.level!)
      .sort((a, b) => b.count! - a.count!);
  }

}
