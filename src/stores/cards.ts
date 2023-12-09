import { defineStore } from 'pinia'
import { computed } from 'vue'
import router from '../router/index'
import type { CardsStore, Card, CardDetail, RetrieveDataResponseInterface } from '@/interfaces'
import { sendNotification } from '@/services/notifications'
import api from '@/services/api'
import { cardData } from '@/services/cardData'
import { cardDetailData } from '@/services/cardDetailData'

import { handleException } from '../services/exceptionsHandler'

export const useCardsStore = defineStore('cards', {
    state: (): CardsStore => {
        return {
            cards: [],
            metadata: {
                pageNumber: 1,
                pageSize: 5,
                pageTotal: 1
            }
        }
    },
    getters: {
        getCards: (state: CardsStore) => state.cards,
        getCardAttributesValuesById: (state) => (cardId: string) => computed(() => {
            const card = state.cards?.find((el: Card) => el.id === cardId);
            return card ? cardData.clone(card) : null
        }),
        getMetadata: (state: CardsStore) => state.metadata,
    },
    actions: {
        async addCard(card: Card) {
            try {
                const response = await api.post('cards/', cardData.toApi(card));
                if(response.status >= 300)
                    throw 'Impossible creare scheda'

                if (!('id' in response.data.data.attributes))
                  throw 'impossible to get new card id from server response'
        
                  card = cardData.fromApi(response.data.data)
                
                if(!this.cards) this.cards = []
                
                this.cards.push(card);
                
                if (this.cards.length/this.metadata.pageTotal > this.metadata.pageSize) {
                  this.metadata.pageNumber++;
                  this.metadata.pageTotal++;
                }
        
                sendNotification({
                  type: 'success',
                  text: 'Scheda creata.'
                })
                router.push({ name: 'cards' })
        
              } catch (exception: any) {
                const message = handleException(exception)
                sendNotification({
                  type: 'error',
                  text: message
                })
              }
        },
        async updateCard(card: Card) {
            try {
                const response = await api.patch(`cards/${card.id}`, cardData.toApi(card));
                if(response.status >= 300)
                    throw 'Impossible aggiornare scheda'

                const updatedCard = cardData.fromApi(response.data.data)
                        
                const index = this.cards.findIndex((u) => u.id === updatedCard.id);
                if (index !== -1) {
                  this.cards[index] = updatedCard;
                }
                sendNotification({
                  type: 'success',
                  text: 'Scheda aggiornata.'
                })
                router.push({ name: 'cards' })
              } catch (exception: any) {
                const message = handleException(exception)
                sendNotification({
                  type: 'error',
                  text: message
                })
              }
        },
        async retrieveCards() {
            try {
                const pageNumber = this.metadata.pageNumber
                const response: RetrieveDataResponseInterface = await api.get(`cards?page=${pageNumber.toString()}`);
                this.cards = response.data.data.map((element: any) => cardData.fromApi(element))
                this.metadata.pageNumber = response.data.meta.current_page
                this.metadata.pageTotal = response.data.meta.last_page
                this.metadata.pageSize = response.data.meta.per_page
        
              } catch (exception: any) {
                const message = handleException(exception)
                sendNotification({
                  type: 'error',
                  text: message
                })
              }
        },
        async deleteCard(cardId: string) {
            try {
                const response = await api.delete('cards/' + cardId);
                if (response.status >= 300)
                  throw 'Impossible cancellare scheda.'
        
                const cardToDelete = this.cards.findIndex(card => card.id == cardId)
                this.cards.splice(cardToDelete, 1);
                
                if (this.cards.length/this.metadata.pageTotal > this.metadata.pageSize) {
                  this.metadata.pageNumber--;
                  this.metadata.pageTotal--;
                }
        
                sendNotification({
                  type: 'success',
                  text: 'Scheda eliminata.'
                })
              } catch (exception: any) {
                const message = handleException(exception)
                sendNotification({
                  type: 'error',
                  text: message
                })
              }
        },
        async addCardDetail(cardDetail: CardDetail, cardId: string) {
            try {
                const response = await api.post('card-details/', cardDetailData.toApi(cardDetail, cardId));
                console.log(response)
                if(response.status >= 300)
                    throw 'Impossible aggiungere riga esercizio a scheda'

                if (!('id' in response.data.data.attributes))
                  throw 'impossible to get new card id from server response'
        
                const createdCardDetail = cardDetailData.fromApi(response.data.data)
                const cardToUpdateIndex = this.cards?.findIndex((el: Card) => el.id === cardId);

                if(cardToUpdateIndex < 0)
                  throw `impossible to get card to update; card id: ${cardId}`
                
                this.cards[cardToUpdateIndex].cardDetails.push(createdCardDetail)
   
                sendNotification({
                  type: 'success',
                  text: 'Scheda creata.'
                })
        
              } catch (exception: any) {
                const message = handleException(exception)
                sendNotification({
                  type: 'error',
                  text: message
                })
              }
        },
    }
})