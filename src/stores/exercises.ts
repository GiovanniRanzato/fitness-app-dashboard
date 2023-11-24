import { defineStore } from 'pinia'
import { computed } from 'vue'
import router from '../router/index'
import type { ExercisesStore, Exercise, RetrieveDataResponseInterface } from '@/interfaces'
import { sendNotification } from '@/services/notifications'
import api from '@/services/api'
import { exerciseData } from '@/services/exerciseData'
import { handleException } from '../services/exceptionsHandler'

export const useExercisesStore = defineStore('exercises', {
    state: (): ExercisesStore => {
        return {
            exercises: [],
            metadata: {
                pageNumber: 1,
                pageSize: 5,
                pageTotal: 1
            }
        }
    },
    getters: {
        getExercises: (state: ExercisesStore) => state.exercises,
        getExerciseAttributesValuesById: (state) => (exerciseId: Number) => computed(() => {
            const exercise = state.exercises?.find(exercises => exercises.id === exerciseId);
            return exercise ? { ...exercise } : null;
        }),
        getMetadata: (state: ExercisesStore) => state.metadata,
    },
    actions: {
        async addExercise(exercise: Exercise) {
            try {
                const response = await api.post('exercises/', exerciseData.toApi(exercise));
        
                if (!('id' in response.data.attributes))
                  throw 'impossible to get new exercise id from server response'
        
                  exercise = exerciseData.fromApi(response.data.attributes)
                
                if(!this.exercises) this.exercises = []
                
                this.exercises.push(exercise);
                
                if (this.exercises.length/this.metadata.pageTotal > this.metadata.pageSize) {
                  this.metadata.pageNumber++;
                  this.metadata.pageTotal++;
                }
        
                sendNotification({
                  type: 'success',
                  text: 'Esercizio creato.'
                })
                router.push({ name: 'exercises' })
        
              } catch (exception: any) {
                const message = handleException(exception)
                sendNotification({
                  type: 'error',
                  text: message
                })
              }
        },
        async updateExercise(exercise: Exercise) {
            try {
                const response = await api.patch(`exercises/${exercise.id.toString()}`, exerciseData.toApi(exercise));
        
                const updatedExercise = exerciseData.fromApi(response.data.attributes)
                        
                const index = this.exercises.findIndex((u) => u.id === updatedExercise.id);
                if (index !== -1) {
                  this.exercises[index] = updatedExercise;
                }
                sendNotification({
                  type: 'success',
                  text: 'Esercizio aggiornato.'
                })
              } catch (exception: any) {
                const message = handleException(exception)
                sendNotification({
                  type: 'error',
                  text: message
                })
              }
        },
        async retrieveExercises() {
            try {
                const pageNumber = this.metadata.pageNumber
                const response: RetrieveDataResponseInterface = await api.get(`exercises?page=${pageNumber.toString()}`);
                this.exercises = response.data.map((element: any) => exerciseData.fromApi(element.attributes))
                this.metadata.pageNumber = response.meta.current_page
                this.metadata.pageTotal = response.meta.last_page
                this.metadata.pageSize = response.meta.per_page
        
              } catch (exception: any) {
                const message = handleException(exception)
                sendNotification({
                  type: 'error',
                  text: message
                })
              }
        },
        deleteExercise(exerciseId: Number) {
            // TODO: Add deleteExercise
        }
    }
})