<script setup lang="ts">
import BaseContainer from './../../components/base/BaseContainer.vue'
import BasePageTitle from './../../components/base/BasePageTitle.vue'
import ExerciseForm from './ExerciseForm.vue'
import { useExercisesStore } from "../../stores/exercises"

import type { Exercise } from '@/interfaces'

const exerciseStore = useExercisesStore()

const save = (exercise: Exercise) => {
  exerciseStore.addExercise(exercise)
}
</script>

<template>
  <main>
    <BaseContainer>
      <BasePageTitle title="Crea nuovo esercizio"/>
      <ExerciseForm :onSubmit="save" :isCreate="true"/>
    </BaseContainer>
  </main>
</template>