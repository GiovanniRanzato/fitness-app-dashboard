<script setup lang="ts">
import { ref } from 'vue'
import BaseBtnPrimary from '../../components/base/BaseBtnPrimary.vue'
import BaseCard from '../../components/base/BaseCard.vue'
import BaseTextField from '../../components/base/BaseTextField.vue'
import BaseTextArea from '../../components/base/BaseTextArea.vue'
import BaseYouTubeVideoIFrame from '../../components/base/BaseYouTubeVideoIFrame.vue'
import BaseInputLabel from '../../components/base/BaseInputLabel.vue'
import BaseAlertInfo from '../../components/base/BaseAlertInfo.vue'

import { useCommonDataStore } from '../../stores/commonData'
import type { Exercise } from '@/interfaces'

const commonDataStore = useCommonDataStore()

const props = defineProps({
  exercise: {
    type: Object as () => Exercise,
    required: false,
    default: {
      id: 0,
      name: '',
      description: '',
      mediaUrl: '',
      notes: '',
      creatorUserId: ''
    }
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

const exerciseClone = ref({ ...props.exercise })

const required = (v: string) => !!v || 'Il campo è richiesto'

function onSubmit() {
  props.onSubmit(exerciseClone.value)
}



</script>
<template>
  <v-form v-model="form">
    <BaseCard title="Informazioni esercizio">
      <v-card-item>
        <BaseInputLabel>Nome</BaseInputLabel>
        <BaseTextField v-model="exerciseClone.name" :readonly="loading" :rules="[required]" placeholder="Punch criminals"
          append-inner-icon="mdi-weight-lifter"></BaseTextField>
        <BaseInputLabel>Media Url</BaseInputLabel>
        <BaseTextField v-model="exerciseClone.mediaUrl" :readonly="loading" placeholder="https://www.youtube.com/watch?v=ViD30k3y"
          append-inner-icon="mdi-link"></BaseTextField>
        <BaseYouTubeVideoIFrame v-if="exerciseClone.mediaUrl" :mediaUrl="exerciseClone.mediaUrl" />
        <BaseAlertInfo class="mb-3" v-else>Inserisci l'url del video da youtube.com da associare a questo esercizio per vedere l'anteprima.</BaseAlertInfo>


        <BaseInputLabel>Descrizione</BaseInputLabel>
        <BaseTextArea v-model="exerciseClone.description" :readonly="loading" placeholder="Do stuff as batmam..."></BaseTextArea>
        <BaseInputLabel>Note</BaseInputLabel>
        <BaseTextArea v-model="exerciseClone.notes" :readonly="loading" placeholder="Remind batmobile key before leave!"></BaseTextArea>

      </v-card-item>
    </BaseCard>
    <div class="d-flex justify-end mt-6">
      <BaseBtnPrimary @click="onSubmit" :disabled="!form">
        Salva
      </BaseBtnPrimary>
    </div>
  </v-form>
</template>