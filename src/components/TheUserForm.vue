<script setup lang="ts">
import { ref } from 'vue'
import BaseBtnPrimary from '../components/base/BaseBtnPrimary.vue'
import BaseTextField from '../components/base/BaseTextField.vue'
import BaseSelect from '../components/base/BaseSelect.vue'
import BaseInputLabel from '../components/base/BaseInputLabel.vue'

import { useCommonDataStore} from '../stores/commonData'
import type { User } from '@/interfaces'

const commonDataStore = useCommonDataStore()

const props = defineProps({
  user: {
      type: Object as () => User,
      required: false,
      default: {
        userId: 0,
        name: '',
        email: '',
        lastName: '',
        phone: '',
        sex: '',
        birthdate: '',
        weight: 0,
        height: 0,
        address: '',
        city: '',
        zip: 0,
        country: '',
        avatar: '',
        role: '0',
    }
  },
  onSubmit: {
    type: Function,
    required: true
  }
})
const form = ref(false)
const loading = ref(false)

const user  = ref(props.user)

const required = [
  (v: string) => !!v || 'Il campo è richiesto',
]
const numeric = [
  (v: string) => /^-?\d*(\.\d+)?$/.test(v) || 'Il campo deve essere numerico',
];

function onSubmit(){
  props.onSubmit(user.value)
}

</script>
<template>
    <v-form v-model="form">
      <BaseInputLabel>Nome</BaseInputLabel>
      <BaseTextField v-model="user.name" :readonly="loading" :rules="required" placeholder="Severus"
        append-inner-icon="mdi-account"></BaseTextField>
      
      <BaseInputLabel>Cognome</BaseInputLabel>
      <BaseTextField v-model="user.lastName" :readonly="loading" placeholder="Piton"
        append-inner-icon="mdi-account-outline"></BaseTextField>
  
      <BaseInputLabel>Telefono</BaseInputLabel>
      <BaseTextField v-model="user.phone" :readonly="loading" placeholder="+12 345 678 9000"
        append-inner-icon="mdi-phone"></BaseTextField>

      <v-divider class="mt-6 mb-6"></v-divider>

      <BaseInputLabel>Sesso</BaseInputLabel>
      <BaseSelect v-model="user.sex" :readonly="loading"
        append-inner-icon="mdi-gender-male-female" :items="commonDataStore.getGenders"></BaseSelect>

      <BaseInputLabel>Data di nascita</BaseInputLabel>
      <BaseTextField v-model="user.birthdate" :readonly="loading" type="date"></BaseTextField>
      
      <BaseInputLabel>Peso (kg)</BaseInputLabel>
      <BaseTextField v-model="user.weight" :readonly="loading" type="number" placeholder="85"
        append-inner-icon="mdi-weight-kilogram"></BaseTextField>

      <BaseInputLabel>Altezza (cm)</BaseInputLabel>
      <BaseTextField v-model="user.height" :readonly="loading" type="number" placeholder="185"
        append-inner-icon="mdi-human-male-height"></BaseTextField>

      <v-divider class="mt-6 mb-6"></v-divider>

      <BaseInputLabel>Via</BaseInputLabel>
      <BaseTextField v-model="user.address" :readonly="loading" type="text" placeholder=""
        append-inner-icon="mdi-map-marker"></BaseTextField>

      <BaseInputLabel>Citta</BaseInputLabel>
      <BaseTextField v-model="user.city" :readonly="loading" type="text" placeholder="example@email.com"
        append-inner-icon="mdi-city"></BaseTextField>
      
      <BaseInputLabel>Cap</BaseInputLabel>
      <BaseTextField v-model="user.zip" :readonly="loading" :rules="numeric" type="text" placeholder="example@email.com"
      append-inner-icon="mdi-target"></BaseTextField>
      
      <BaseInputLabel>Paese</BaseInputLabel>
      <BaseTextField v-model="user.country" :readonly="loading" type="text" placeholder="example@email.com"
      append-inner-icon="mdi-earth"></BaseTextField>

      <BaseBtnPrimary class="mb-8 mt-8" @click="onSubmit" :disabled="!form">
        Salva
      </BaseBtnPrimary>
    </v-form>
</template>