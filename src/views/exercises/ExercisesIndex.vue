<script setup lang="ts">
import BaseContainer from './../../components/base/BaseContainer.vue'
import BasePageTitle from './../../components/base/BasePageTitle.vue'
import BasePageActions from './../../components/base/BasePageActions.vue'
import ExercisesTable from './ExercisesTable.vue'
import router from "../../router/index"
import { useUiStore } from '../../stores/ui'
import { useAuthStore } from '../../stores/auth'
import { useExercisesStore } from '../../stores/exercises'

const uiStore = useUiStore()
const authStore = useAuthStore()
const exerciseStore = useExercisesStore()

uiStore.onSearch = (search: String) => exerciseStore.retrieveExercises(search, 1)

const addItem = () => {
  router.push('exercises/add')
}
</script>

<template>
  <main>
    <BaseContainer>
      <BasePageTitle title="Esercizi" />
      <BasePageActions v-if="authStore.canCreateExercises" :onAdd="addItem"/>
      <ExercisesTable />
    </BaseContainer>
  </main>
</template>
