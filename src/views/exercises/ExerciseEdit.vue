<script setup lang="ts">
import BaseContainer from './../../components/base/BaseContainer.vue'
import BasePageTitle from './../../components/base/BasePageTitle.vue'
import BaseAlertWarning from './../../components/base/BaseAlertWarning.vue'

import ExerciseForm from './ExerciseForm.vue'
import { useExercisesStore } from "../../stores/exercises"

import type { Exercise } from '@/interfaces'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})
const exercisesStore = useExercisesStore()

const save = (exercise: Exercise) => {
  exercisesStore.updateExercise(exercise)
}
const exerciseAttributesValues = exercisesStore.getExerciseAttributesValuesById(props.id)
</script>

<template>
  <main>
    <BaseContainer>
      <BasePageTitle title="Modifica esercizio"/>
      <ExerciseForm v-if="exerciseAttributesValues" :exercise="exerciseAttributesValues" :onSubmit="save" />
      <BaseAlertWarning v-else>Si è verificato un problema: dati esercizio non presenti.</BaseAlertWarning>
    </BaseContainer>
  </main>
</template>