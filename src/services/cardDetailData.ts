import type { CardDetail } from '../interfaces';
import { exerciseData } from './exerciseData';

export const cardDetailData = {
  toApi(cardDetail: CardDetail, cardId: string) {
    const data =  {
        quantity: cardDetail.quantity ? cardDetail.quantity : 0,
        time_duration: cardDetail.timeDuration ? cardDetail.timeDuration : 0,
        time_recovery: cardDetail.timeRecovery ? cardDetail.timeRecovery : 0,
        weight: cardDetail.weight ? cardDetail.weight : 0,
        notes: cardDetail.notes ? cardDetail.notes : '',
        exercise_id: cardDetail.exercise.id,
        card_id: cardId,
      };
      return Object.fromEntries(
        Object.entries(data).filter(([key, value]) => value !== null)
      );
  },

  fromApi(cardDetail: any): CardDetail {
    return {
        id: cardDetail.attributes.id ? cardDetail.attributes.id : '',
        quantity: cardDetail.attributes.quantity ? cardDetail.attributes.quantity : 0,
        timeDuration: cardDetail.attributes.time_duration ? cardDetail.attributes.time_duration : 0,
        timeRecovery: cardDetail.attributes.time_recovery ? cardDetail.attributes.time_recovery : 0,
        weight: cardDetail.attributes.weight ? cardDetail.attributes.weight : 0,
        notes: cardDetail.attributes.notes ? cardDetail.attributes.notes : '',
        exercise: cardDetail.exercise.attributes.id ? exerciseData.fromApi(cardDetail.exercise.attributes)  : exerciseData.emptyExercise()
    }
  },
  emptyCardDetail(): CardDetail {
    return {
        id: '',
        quantity: 0,
        timeDuration: 0,
        timeRecovery: 0,
        weight: 0,
        notes: '',
        exercise: exerciseData.emptyExercise()
    }
  },
  clone(cardDetail: CardDetail): CardDetail {
    return { ...cardDetail, exercise: exerciseData.clone(cardDetail.exercise) }
  }
};