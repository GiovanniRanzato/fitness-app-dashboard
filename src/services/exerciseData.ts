import type { Exercise } from '../interfaces';

export const exerciseData = {
  toApi(exercise: Exercise) {
    const data =  {
        name: exercise.name,
        description: exercise.description,
        media_url: exercise.mediaUrl,
        notes: exercise.notes,
        creator_user_id: exercise.creatorUserId

      };
      return Object.fromEntries(
        Object.entries(data).filter(([key, value]) => value !== null)
      );
  },
  fromApi(exerciseAttributes: any): Exercise {
    return {
      id: exerciseAttributes.id ?? null,
      name: exerciseAttributes.name ?? null,
      description: exerciseAttributes.description ?? null,
      mediaUrl: exerciseAttributes.mediaUrl ?? null,
      notes: exerciseAttributes.notes ?? null,
      creatorUserId: exerciseAttributes.creatorUserId ?? null
    }
  }
};