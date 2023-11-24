import { defineStore } from 'pinia'
import { computed } from 'vue'
// import router from '../router/index'
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
            // TODO: Add addExercise
        },
        async updateExercise(exercise: Exercise) {
            // TODO: Add updateExercise
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