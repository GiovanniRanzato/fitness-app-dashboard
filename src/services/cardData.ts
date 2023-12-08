import type { Card } from '../interfaces';
import { userData } from './userData';

export const cardData = {
  toApi(card: Card) {
    const data =  {
        name: card.name,
        disabled: card.disabled ,
        date_from: card.dateFrom ? card.dateFrom : '',
        date_to: card.dateTo ? card.dateTo : '',
        user_id: card.user.id,
      };
      return Object.fromEntries(
        Object.entries(data).filter(([key, value]) => value !== null)
      );
  },
  fromApi(card: any): Card {
    return {
        id: card.attributes.id ? card.attributes.id.toString() : null,
        name: card.attributes.name ?? null,
        disabled: card.attributes.disabled ? true : false,
        dateFrom: card.attributes.date_from ?? null,
        dateTo: card.attributes.date_to ?? null,
        user: card.user.attributes ? userData.fromApi(card.user.attributes) : userData.emptyUser()
    }
  }
};