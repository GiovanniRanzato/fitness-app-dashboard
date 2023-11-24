<script setup lang="ts">
import BaseContainer from './../../components/base/BaseContainer.vue'
import BasePageTitle from './../../components/base/BasePageTitle.vue'
import BasePageActions from './../../components/base/BasePageActions.vue'
import ExercisesTable from './ExercisesTable.vue'
import router from "../../router/index"
import { useAuthStore } from '../../stores/auth'

const authStore = useAuthStore()

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
