<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import BaseBtnPrimary from '../../components/base/BaseBtnPrimary.vue'
import BaseTextArea from '../../components/base/BaseTextArea.vue'
import BaseTextField from '../../components/base/BaseTextField.vue'
import BaseSelectRemote from '../../components/base/BaseSelectRemote.vue'
import BaseInputLabel from '../../components/base/BaseInputLabel.vue'

import { useExercisesStore } from '../../stores/exercises'
import type { CardDetail } from '@/interfaces'
import { cardDetailData } from '@/services/cardDetailData'

const exercisesStore = useExercisesStore()

const props = defineProps({
  cardDetail: {
    type: Object as () => CardDetail,
    required: false,
    default: cardDetailData.emptyCardDetail()
  },
  onSubmit: {
    type: Function,
    required: true
  },
  isCreate: {
    type: Boolean,
    required: false,
    default: false
  }
})
const form = ref(false)
const loading = ref(false)

const cardDetailClone = ref({ ...props.cardDetail })

const exerciseOptions = exercisesStore.getExercisesSelectItems


const required = (v: string) => !!v || 'Il campo è richiesto'

function onSubmit() {
  props.onSubmit(cardDetailClone.value)
}

function searchUser (value: string) {
    exercisesStore.retrieveExercises()
}

</script>
<template>
  <v-form v-model="form">
    <BaseInputLabel>Esercizio</BaseInputLabel>
    <BaseSelectRemote
        v-model="cardDetailClone.exercise.id" 
        :readonly="loading" 
        :rules="[required]"
        :options="exerciseOptions"
        :onSearch="searchUser"
        placeholder="Digita il nome dell'esercizio..."
        append-inner-icon="mdi-weight-lifter">
    </BaseSelectRemote>
    <BaseInputLabel>Quantità</BaseInputLabel>
    <BaseTextField v-model="cardDetailClone.quantity" :readonly="loading" type="number" placeholder="Il numero di ripetizioni"
        append-inner-icon="mdi-numeric"></BaseTextField>
    
    <BaseInputLabel>Durata (sec)</BaseInputLabel>
    <BaseTextField v-model="cardDetailClone.timeDuration" :readonly="loading" type="number" placeholder="La durata dell'esercizio"
        append-inner-icon="mdi-timer-play-outline"></BaseTextField>

    <BaseInputLabel>Durata recupero (sec)</BaseInputLabel>
    <BaseTextField v-model="cardDetailClone.timeRecovery" :readonly="loading" type="number" placeholder="La durata del recupero"
        append-inner-icon="mdi-timer-pause-outline"></BaseTextField>

    <BaseInputLabel>Peso (kg)</BaseInputLabel>
    <BaseTextField v-model="cardDetailClone.weight" :readonly="loading" type="number" placeholder="Il peso da usare per l'esercizio"
        append-inner-icon="mdi-weight"></BaseTextField>
        
    <BaseInputLabel>Note</BaseInputLabel>
    <BaseTextArea v-model="cardDetailClone.notes" :readonly="loading" placeholder="Remind batmobile key before leave!"></BaseTextArea>
    <div class="d-flex justify-end mt-6">
      <BaseBtnPrimary @click="onSubmit" :disabled="!form">
        Salva
      </BaseBtnPrimary>
    </div>
  </v-form>
</template>