<script setup lang="ts">
import { ref } from 'vue'
import BaseBtnPrimary from '../../components/base/BaseBtnPrimary.vue'
import BaseCard from '../../components/base/BaseCard.vue'
import BaseTextField from '../../components/base/BaseTextField.vue'
import BaseSelect from '../../components/base/BaseSelect.vue'
import BaseInputLabel from '../../components/base/BaseInputLabel.vue'

import { useCommonDataStore } from '../../stores/commonData'
import type { User } from '@/interfaces'

const commonDataStore = useCommonDataStore()

const props = defineProps({
  user: {
    type: Object as () => User,
    required: false,
    default: {
      id: 0,
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

const userClone = ref(JSON.parse(JSON.stringify(props.user)))

const required = [
  (v: string) => !!v || 'Il campo è richiesto',
]
const numeric = [
  (v: string) => /^-?\d*(\.\d+)?$/.test(v) || 'Il campo deve essere numerico',
];

function onSubmit() {
  props.onSubmit(userClone.value)
}

</script>
<template>
  <v-form v-model="form">
    <v-row>
      <v-col>
        <BaseCard title="Informazioni contatto">
          <v-card-item>
            <BaseInputLabel>Nome</BaseInputLabel>
            <BaseTextField v-model="userClone.name" :readonly="loading" :rules="required" placeholder="Severus"
              append-inner-icon="mdi-account"></BaseTextField>

            <BaseInputLabel>Cognome</BaseInputLabel>
            <BaseTextField v-model="userClone.lastName" :readonly="loading" placeholder="Piton"
              append-inner-icon="mdi-account-outline"></BaseTextField>

            <BaseInputLabel>Telefono</BaseInputLabel>
            <BaseTextField v-model="userClone.phone" :readonly="loading" placeholder="+12 345 678 9000"
              append-inner-icon="mdi-phone"></BaseTextField>
          </v-card-item>
        </BaseCard>
      </v-col>
    </v-row>
    <v-row>
      <v-col sm="12" md="6">
        <BaseCard title="Dati personali">
          <v-card-item>
            <BaseInputLabel>Sesso</BaseInputLabel>
            <BaseSelect v-model="userClone.sex" :readonly="loading" append-inner-icon="mdi-gender-male-female"
              :items="commonDataStore.getGenders"></BaseSelect>

            <BaseInputLabel>Data di nascita</BaseInputLabel>
            <BaseTextField v-model="userClone.birthdate" :readonly="loading" type="date"></BaseTextField>

            <BaseInputLabel>Peso (kg)</BaseInputLabel>
            <BaseTextField v-model="userClone.weight" :readonly="loading" type="number" placeholder="85"
              append-inner-icon="mdi-weight-kilogram"></BaseTextField>

            <BaseInputLabel>Altezza (cm)</BaseInputLabel>
            <BaseTextField v-model="userClone.height" :readonly="loading" type="number" placeholder="185"
              append-inner-icon="mdi-human-male-height"></BaseTextField>
          </v-card-item>
        </BaseCard>
      </v-col>

      <v-col sm="12" md="6">
        <BaseCard title="Indirizzo">
          <v-card-item>

            <BaseInputLabel>Via</BaseInputLabel>
            <BaseTextField v-model="userClone.address" :readonly="loading" type="text" placeholder=""
              append-inner-icon="mdi-map-marker"></BaseTextField>

            <BaseInputLabel>Citta</BaseInputLabel>
            <BaseTextField v-model="userClone.city" :readonly="loading" type="text" placeholder="example@email.com"
              append-inner-icon="mdi-city"></BaseTextField>

            <BaseInputLabel>Cap</BaseInputLabel>
            <BaseTextField v-model="userClone.zip" :readonly="loading" :rules="numeric" type="text"
              placeholder="example@email.com" append-inner-icon="mdi-target"></BaseTextField>

            <BaseInputLabel>Paese</BaseInputLabel>
            <BaseTextField v-model="userClone.country" :readonly="loading" type="text" placeholder="example@email.com"
              append-inner-icon="mdi-earth"></BaseTextField>
          </v-card-item>
        </BaseCard>
      </v-col>
    </v-row>


    <BaseBtnPrimary class="mt-6" @click="onSubmit" :disabled="!form">
      Salva
    </BaseBtnPrimary>
  </v-form>
</template>