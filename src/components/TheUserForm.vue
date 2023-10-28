<script setup lang="ts">
import { ref } from 'vue'
import BaseBtnPrimary from '../components/base/BaseBtnPrimary.vue'
import BaseTextField from '../components/base/BaseTextField.vue'
import BaseInputLabel from '../components/base/BaseInputLabel.vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()

const form = ref(false)
const loading = ref(false)

const name = ref(authStore.name)
const lastName = ref(authStore.lastName)
const phone = ref(authStore.phone)
const sex = ref(authStore.sex)
const birthdate = ref(authStore.birthdate)
const weight = ref(authStore.weight)
const height = ref(authStore.height)
const address = ref(authStore.address)
const city = ref(authStore.city)
const zip = ref(authStore.zip)
const country = ref(authStore.country)

const required = [
  (v: string) => !!v || 'Il campo è richiesto',
]
const numeric = [
  (v: string) => /^-?\d*(\.\d+)?$/.test(v) || 'Il campo deve essere numerico',
];

function onSubmit(){
  console.log(name.value)
  console.log(lastName.value)
  console.log(phone.value)
  console.log(sex.value)
  console.log(birthdate.value)
  console.log(weight.value)
  console.log(height.value)
  console.log(address.value)
  console.log(city.value)
  console.log(zip.value)
  console.log(country.value)
}

</script>
<template>
    <v-form v-model="form">
      <BaseInputLabel>Nome</BaseInputLabel>
      <BaseTextField v-model="name" :readonly="loading" :rules="required" placeholder="Severus"
        append-inner-icon="mdi-account"></BaseTextField>
      
      <BaseInputLabel>Cognome</BaseInputLabel>
      <BaseTextField v-model="lastName" :readonly="loading" placeholder="Piton"
        append-inner-icon="mdi-account-outline"></BaseTextField>
  
      <BaseInputLabel>Telefono</BaseInputLabel>
      <BaseTextField v-model="phone" :readonly="loading" placeholder="+12 345 678 9000"
        append-inner-icon="mdi-phone"></BaseTextField>

      <v-divider class="mt-6 mb-6"></v-divider>

      <BaseInputLabel>Sesso</BaseInputLabel>
      <v-select variant="outlined"  rounded="xl" v-model="sex" :readonly="loading"
        append-inner-icon="mdi-gender-male-female" :items="[{value: 'M', title: 'Maschio'}, {value: 'F', title: 'Femmina'}]"></v-select>

      <BaseInputLabel>Data di nascita</BaseInputLabel>
      <BaseTextField v-model="birthdate" :readonly="loading" type="date"></BaseTextField>
      
      <BaseInputLabel>Peso (kg)</BaseInputLabel>
      <BaseTextField v-model="weight" :readonly="loading" type="number" placeholder="85"
        append-inner-icon="mdi-weight-kilogram"></BaseTextField>

      <BaseInputLabel>Altezza (cm)</BaseInputLabel>
      <BaseTextField v-model="height" :readonly="loading" type="number" placeholder="185"
        append-inner-icon="mdi-human-male-height"></BaseTextField>

      <v-divider class="mt-6 mb-6"></v-divider>

      <BaseInputLabel>Via</BaseInputLabel>
      <BaseTextField v-model="address" :readonly="loading" type="text" placeholder=""
        append-inner-icon="mdi-map-marker"></BaseTextField>

      <BaseInputLabel>Citta</BaseInputLabel>
      <BaseTextField v-model="city" :readonly="loading" type="text" placeholder="example@email.com"
        append-inner-icon="mdi-city"></BaseTextField>
      
      <BaseInputLabel>Cap</BaseInputLabel>
      <BaseTextField v-model="zip" :readonly="loading" :rules="numeric" type="text" placeholder="example@email.com"
      append-inner-icon="mdi-target"></BaseTextField>
      
      <BaseInputLabel>Paese</BaseInputLabel>
      <BaseTextField v-model="country" :readonly="loading" type="text" placeholder="example@email.com"
      append-inner-icon="mdi-earth"></BaseTextField>

      <BaseBtnPrimary class="mb-8 mt-8" @click="onSubmit" :disabled="!form">
        Salva
      </BaseBtnPrimary>
    </v-form>
</template>