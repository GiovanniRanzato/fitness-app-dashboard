import type { Card } from '../interfaces';

export const cardData = {
  toApi(card: Card) {
    const data =  {
        name: card.name,
        disabled: card.disabled ,
        date_from: card.dateFrom ? card.dateFrom : '',
        date_to: card.dateTo ? card.dateTo : '',
        user_id: card.userId,

      };
      return Object.fromEntries(
        Object.entries(data).filter(([key, value]) => value !== null)
      );
  },
  fromApi(cardAttributes: any): Card {
    return {
        id: cardAttributes.id ?? null,
        name: cardAttributes.name ?? null,
        disabled: cardAttributes.disabled ? true : false,
        dateFrom: cardAttributes.date_from ?? null,
        dateTo: cardAttributes.date_to ?? null,
        userId: cardAttributes.user_id ?? null,
    }
  }
};