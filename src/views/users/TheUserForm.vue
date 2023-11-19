<script setup lang="ts">
import { ref } from 'vue'
import BaseBtnPrimary from '../../components/base/BaseBtnPrimary.vue'
import BaseCard from '../../components/base/BaseCard.vue'
import BaseTextField from '../../components/base/BaseTextField.vue'
import BaseSelect from '../../components/base/BaseSelect.vue'
import BaseInputLabel from '../../components/base/BaseInputLabel.vue'

import { useCommonDataStore } from '../../stores/commonData'
import type { User, UserRole} from '@/interfaces'

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
      role: '0' as UserRole,
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

const userClone =  ref({ ...props.user })

const required = (v: string) => !!v || 'Il campo è richiesto'

const numeric = (v: string) => {
  if (v === null) {
    return true
  }
  return /^-?\d*(\.\d+)?$/.test(v) || 'Il campo deve essere numerico'
}

const email = (v: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(v) || 'Inserisci un indirizzo email valido'
}

function onSubmit() {
  props.onSubmit(userClone.value)
}
const password = ref('')
const confirmPassword = ref('')

</script>
<template>
  <v-form v-model="form">
    <v-row>
      <v-col>
        <BaseCard title="Informazioni contatto">
          <v-card-item>
            <BaseInputLabel>Nome</BaseInputLabel>
            <BaseTextField v-model="userClone.name" :readonly="loading" :rules="[required]" placeholder="Bruce"
              append-inner-icon="mdi-account"></BaseTextField>

            <BaseInputLabel>Cognome</BaseInputLabel>
            <BaseTextField v-model="userClone.lastName" :readonly="loading" placeholder="Wayne"
              append-inner-icon="mdi-account-outline"></BaseTextField>
            
            <BaseInputLabel>Email</BaseInputLabel>
            <BaseTextField v-model="userClone.email" :readonly="!isCreate" :disabled="!isCreate" placeholder="bruce@wayne.com" :rules="[email]"
              append-inner-icon="mdi-email"></BaseTextField>

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
            <BaseTextField v-model="userClone.birthDate" :readonly="loading" type="date"></BaseTextField>

            <BaseInputLabel>Peso (kg)</BaseInputLabel>
            <BaseTextField v-model="userClone.weight" :readonly="loading" type="number" placeholder="95"
              append-inner-icon="mdi-weight-kilogram"></BaseTextField>

            <BaseInputLabel>Altezza (cm)</BaseInputLabel>
            <BaseTextField v-model="userClone.height" :readonly="loading" type="number" placeholder="195"
              append-inner-icon="mdi-human-male-height"></BaseTextField>
          </v-card-item>
        </BaseCard>
      </v-col>

      <v-col sm="12" md="6">
        <BaseCard title="Indirizzo">
          <v-card-item>

            <BaseInputLabel>Via</BaseInputLabel>
            <BaseTextField v-model="userClone.address" :readonly="loading" type="text" placeholder="Saint Rafael Drive 380"
              append-inner-icon="mdi-map-marker"></BaseTextField>

            <BaseInputLabel>Citta</BaseInputLabel>
            <BaseTextField v-model="userClone.city" :readonly="loading" type="text" placeholder="Gotham City"
              append-inner-icon="mdi-city"></BaseTextField>

            <BaseInputLabel>Cap</BaseInputLabel>
            <BaseTextField v-model="userClone.zip" :readonly="loading" :rules="[numeric]" type="text"
              placeholder="12345" append-inner-icon="mdi-target"></BaseTextField>

            <BaseInputLabel>Paese</BaseInputLabel>
            <BaseTextField v-model="userClone.country" :readonly="loading" type="text" placeholder="Us"
              append-inner-icon="mdi-earth"></BaseTextField>
          </v-card-item>
        </BaseCard>
      </v-col>
    </v-row>
    <div class="d-flex justify-end mt-6">
      <BaseBtnPrimary @click="onSubmit" :disabled="!form">
        Salva
      </BaseBtnPrimary>
    </div>
  </v-form>
</template>