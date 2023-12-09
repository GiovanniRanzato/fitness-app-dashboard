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
        getExerciseAttributesValuesById: (state) => (exerciseId: string) => computed(() => {
            const exercise = state.exercises?.find(exercises => exercises.id === exerciseId);
            return exercise ? { ...exercise } : null;
        }),
        getExercisesSelectItems: (state) => state.exercises.map(exercise => { return { value: exercise.id, title: exercise.name }}),
        getMetadata: (state: ExercisesStore) => state.metadata,
    },
    actions: {
        async addExercise(exercise: Exercise) {
            try {
                const response = await api.post('exercises/', exerciseData.toApi(exercise));
                if(response.status >= 300)
                    throw 'Impossible creare esercizio'

                if (!('id' in response.data.data.attributes))
                  throw 'impossible to get new exercise id from server response'
        
                  exercise = exerciseData.fromApi(response.data.data.attributes)
                
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
                const response = await api.patch(`exercises/${exercise.id}`, exerciseData.toApi(exercise));
                if(response.status >= 300)
                    throw 'Impossible aggiornare esercizio'

                const updatedExercise = exerciseData.fromApi(response.data.data.attributes)
                        
                const index = this.exercises.findIndex((u) => u.id === updatedExercise.id);
                if (index !== -1) {
                  this.exercises[index] = updatedExercise;
                }
                sendNotification({
                  type: 'success',
                  text: 'Esercizio aggiornato.'
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
        async retrieveExercises() {
            try {
                const pageNumber = this.metadata.pageNumber
                const response: RetrieveDataResponseInterface = await api.get(`exercises?page=${pageNumber.toString()}`);
                this.exercises = response.data.data.map((element: any) => exerciseData.fromApi(element.attributes))
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
        async deleteExercise(exerciseId: string) {
            try {
                const response = await api.delete('exercises/' + exerciseId);
                if (response.status >= 300)
                  throw 'Impossible cancellare esercizio'
        
                const exerciseToDelete = this.exercises.findIndex(exercise => exercise.id == exerciseId)
                this.exercises.splice(exerciseToDelete, 1);
                
                if (this.exercises.length/this.metadata.pageTotal > this.metadata.pageSize) {
                  this.metadata.pageNumber--;
                  this.metadata.pageTotal--;
                }
        
                sendNotification({
                  type: 'success',
                  text: 'Esercizio eliminato.'
                })
              } catch (exception: any) {
                const message = handleException(exception)
                sendNotification({
                  type: 'error',
                  text: message
                })
              }
        }
    }
})