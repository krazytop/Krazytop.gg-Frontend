import {Component, Input} from '@angular/core';
import {CRCard} from "../../../model/clash-royal/cr-card.model";
import {min} from "rxjs";

@Component({
  selector: 'cr-cards',
  templateUrl: './cr-cards.component.html',
  styleUrls: ['./cr-cards.component.css']
})
export class CrCardsComponent {

  @Input() isParentComponentReady: boolean = false;
  @Input() cards: CRCard[] = [];

  getCardName(card: CRCard): string {
    return card.name!.toLowerCase().replaceAll(' ', '-').replaceAll('.', '');
  }

  getOrderedCardsByLevel(cards: CRCard[]): CRCard[]{
    return cards.sort((a, b) => b.level! - a.level!);
  }

    protected readonly min = min;
}
