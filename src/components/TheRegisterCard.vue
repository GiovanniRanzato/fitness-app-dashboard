<script setup lang="ts">
import { ref, computed, onBeforeMount } from 'vue'
import BaseLink from '../components/base/BaseLink.vue'
import BaseBtnPrimary from '../components/base/BaseBtnPrimary.vue'
import BaseCard from '../components/base/BaseCard.vue'
import BaseTextField from '../components/base/BaseTextField.vue'
import BaseInputLabel from '../components/base/BaseInputLabel.vue'
import { useAuthStore } from '../stores/auth'
import { useTermsOfServiceStore } from '../stores/termsOfService'

const authStore = useAuthStore()
const termsOfServiceStore = useTermsOfServiceStore()

onBeforeMount(()=> {
  termsOfServiceStore.retrieveLatest()
})

const form = ref(false)
const loading = ref(false)
const email = ref('')
const name = ref('')
const password = ref('')
const passwordCounter = 8
const showPassword = ref(false)
const termsOfServiceModalIsVisible = ref(false)
const termsOfServiceAccepted = ref()
const termsOfServiceReaded = ref(false)
const termsOfServiceData = computed(() => termsOfServiceStore.getTermsOfService)

const emailRules = [
  (v: string) => !!v || 'Email è richiesta',
  (v: string) => /.+@.+\..+/.test(v) || 'Deve essere un indirizzo email valido',
]

const passwordRules = [
  (v: string) => !!v || 'La password è richiesta',
  (v: string) => v.length >= passwordCounter || 'La password deve contenere almeno ' + passwordCounter + ' caratteri',
  (v: string) => /[a-z]/.test(v) || 'La password deve contenere almeno una lettera minuscola',
  (v: string) => /[A-Z]/.test(v) || 'La password deve contenere almeno una lettera maiuscola',
  (v: string) => /\d/.test(v) || 'La password deve contenere almeno un numero',
  (v: string) => /[^a-zA-Z0-9]/.test(v) || 'La password deve contenere almeno un carattere speciale',
]

const nameRules = [
  (v: string) => !!v || 'Il nome è richiesto',
]

const termsOfServiceRules = [
  (v: string) => {
    if (v && !termsOfServiceReaded.value) termsOfServiceAccepted.value = false
    return !!termsOfServiceReaded.value || 'La lettura dei termini del servizio è obbligatoria'
  },
  (v: string) => !!v || 'L\'accettazione dei termini del servizio è obbligatoria',
]

function onSubmit() {
  if (!form.value) 
    return false;
  authStore.register({name: name.value, email: email.value, password: password.value, termsOfServiceAccepted: termsOfServiceAccepted.value})
}

function showTermsOfService() {
  termsOfServiceModalIsVisible.value = true
}
function setTermsOfServiceReaded() {
  termsOfServiceModalIsVisible.value = false
  termsOfServiceReaded.value = true
}
</script>
<template>
  <v-card class="pa-12 mx-auto" elevation="6" rounded="xl" max-width="448">
    <v-form v-model="form">
      <BaseInputLabel>Nome</BaseInputLabel>
      <BaseTextField v-model="name" :readonly="loading" :rules="nameRules" clearable placeholder="Mario"
        prepend-inner-icon="mdi-account"></BaseTextField>

      <BaseInputLabel>Email</BaseInputLabel>
      <BaseTextField v-model="email" :readonly="loading" :rules="emailRules" clearable placeholder="example@email.com"
        prepend-inner-icon="mdi-email-outline"></BaseTextField>

      <BaseInputLabel>Password</BaseInputLabel>
      <BaseTextField v-model="password" :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
        :type="showPassword ? 'text' : 'password'" placeholder="Enter your password" prepend-inner-icon="mdi-lock-outline"
        :readonly="loading" :rules="passwordRules" @click:append-inner="showPassword = !showPassword"></BaseTextField>

      <v-checkbox
        color="blue"
        class="d-print-inline"
        v-model="termsOfServiceAccepted" 
        :value="termsOfServiceData.id"
        :rules="termsOfServiceRules" 
        :disabled="termsOfServiceData.text && termsOfServiceData.id ? false : true"
        ><template v-slot:label>
          <span>Ho letto e accetto i <BaseLink to="#" @click="showTermsOfService">termini del servizio</BaseLink></span>
        </template>
      </v-checkbox>

      <BaseBtnPrimary block class="mb-8 mt-8" :disabled="!form" @click="onSubmit">
        Registrati
      </BaseBtnPrimary>
    </v-form>
    <v-card-text class="text-center pb-0">
      <BaseLink to="/"><v-icon icon="mdi-chevron-left"></v-icon>Sei già registrato</BaseLink>
    </v-card-text>
  </v-card>
  <v-dialog v-model="termsOfServiceModalIsVisible" width="800">
    <BaseCard>
      <v-card-item>
        <div v-html="termsOfServiceData.text"></div>
      </v-card-item>
      <v-card-item class="mb-6">
        <BaseBtnPrimary  @click="setTermsOfServiceReaded">Ho letto
      </BaseBtnPrimary>
      </v-card-item>
    </BaseCard>
  </v-dialog>
</template>