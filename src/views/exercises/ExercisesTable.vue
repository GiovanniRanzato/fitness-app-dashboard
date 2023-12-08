<script setup lang="ts">
import { computed } from "vue"
import { useExercisesStore } from "../../stores/exercises"
import { useAuthStore } from '../../stores/auth'
import BaseTableBtnEdit from "../../components/base/BaseTableBtnEdit.vue"
import BaseTableBtnDelete from "../../components/base/BaseTableBtnDelete.vue"
import BaseTableBtnView from "../../components/base/BaseTableBtnView.vue"

import BaseAlertInfo from "../../components/base/BaseAlertInfo.vue"
import router from "../../router/index"

const exercisesStore = useExercisesStore()
const authStore = useAuthStore()

exercisesStore.retrieveExercises()
const exercises = computed(() => exercisesStore.getExercises)
const metadata = exercisesStore.getMetadata


const viewExercise = (exerciseId: string) => { 
  router.push({ name: 'exercises-view', params: { id: exerciseId } })
}
const editExercise = (exerciseId: string) => { 
  router.push({ name: 'exercises-edit', params: { id: exerciseId } })
}
const deleteExercise = (userId: string) =>{ 
  exercisesStore.deleteExercise(userId)
}

const onPageChange = () => {
  exercisesStore.retrieveExercises()
}
</script>
<template>
  <v-table>
    <thead>
      <tr>
        <th>Nome</th>
        <th class="text-right"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in exercises" :key="item.id" >
        <td>{{ item.name }}</td>


        <td class="text-right"><v-col cols="auto">
            <BaseTableBtnView @click="()=> viewExercise(item.id)"/>
            <BaseTableBtnEdit v-if="authStore.canUpdateExercises" @click="()=> editExercise(item.id)"/>
            <BaseTableBtnDelete v-if="authStore.canDeleteExercises" :onConfirmDelete="() => deleteExercise(item.id)" />
        </v-col></td>
      </tr>
    </tbody>
  </v-table>
  <v-divider class="mb-6"></v-divider>
  <v-pagination
    v-if="metadata.pageTotal > 1"
    v-model="metadata.pageNumber"
    :length="metadata.pageTotal"
    active-color="blue"
    rounded="circle"
    @click="onPageChange"
  ></v-pagination>
  <BaseAlertInfo v-if="!exercises || exercises.length == 0">Nessun record presente</BaseAlertInfo>
</template>