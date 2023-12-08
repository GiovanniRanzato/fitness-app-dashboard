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
        id: card.attributes.id ? card.attributes.id.toString() : '',
        name: card.attributes.name ?? '',
        disabled: card.attributes.disabled ? true : false,
        dateFrom: card.attributes.date_from ?? '',
        dateTo: card.attributes.date_to ?? '',
        user: card.user.attributes ? userData.fromApi(card.user.attributes) : userData.emptyUser(),
        cardDetails: card.cardDetails ? card.cardDetails : [] 
    }
  },
  emptyCard(): Card {
    return {
      id: '',
      name: '',
      disabled: false,
      dateFrom: '',
      dateTo: '',
      user: userData.emptyUser(),
      cardDetails: []
    }
  }
};