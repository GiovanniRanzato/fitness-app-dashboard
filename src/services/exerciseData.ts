import type { Exercise } from '../interfaces';

export const exerciseData = {
  toApi(exercise: Exercise) {
    const data =  {
        name: exercise.name,
        description: exercise.description,
        media_url: exercise.mediaUrl,
        notes: exercise.notes,
        creator_user_id: exercise.creatorUserId ? exercise.creatorUserId  : null

      };
      return Object.fromEntries(
        Object.entries(data).filter(([key, value]) => value !== null)
      );
  },
  fromApi(exerciseAttributes: any): Exercise {
    return {
      id: exerciseAttributes.id ? exerciseAttributes.id.toString() : '',
      name: exerciseAttributes.name ?? '',
      description: exerciseAttributes.description ?? '',
      mediaUrl: exerciseAttributes.media_url ?? '',
      notes: exerciseAttributes.notes ?? '',
      creatorUserId: exerciseAttributes.creatorUserId ?? ''
    }
  },
  emptyExercise(): Exercise {
    return {    
      id: '',
      name: '',
      description: '',
      mediaUrl: '',
      notes: '',
      creatorUserId: ''
    }
  },
  clone(exercise: Exercise): Exercise {
    return { ...exercise}
  }
};