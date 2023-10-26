<script setup lang="ts">
import { ref } from 'vue'
import BaseLink from '../components/base/BaseLink.vue'
import BaseBtnPrimary from '../components/base/BaseBtnPrimary.vue'
import BaseTextField from '../components/base/BaseTextField.vue'
import BaseInputLabel from '../components/base/BaseInputLabel.vue'
import BaseCard from '../components/base/BaseCard.vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()

const form = ref(false)
const loading = ref(false)
const email = ref('')
const name = ref('')
const password = ref('')
const passwordCounter = 8
const showPassword = ref(false)
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

function onSubmit() {
  if (!form.value) 
    return false;
  authStore.register(name.value, email.value, password.value)
}
</script>
<template>
  <BaseCard max-width="448">
    <v-form v-model="form">
      <BaseInputLabel>Nome</BaseInputLabel>
      <BaseTextField v-model="name" :readonly="loading" :rules="nameRules" clearable placeholder="example@email.com"
        prepend-inner-icon="mdi-account"></BaseTextField>

      <BaseInputLabel>Email</BaseInputLabel>
      <BaseTextField v-model="email" :readonly="loading" :rules="emailRules" clearable placeholder="example@email.com"
        prepend-inner-icon="mdi-email-outline"></BaseTextField>

      <BaseInputLabel>Password</BaseInputLabel>
      <BaseTextField v-model="password" :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
        :type="showPassword ? 'text' : 'password'" placeholder="Enter your password" prepend-inner-icon="mdi-lock-outline"
        :readonly="loading" :rules="passwordRules" @click:append-inner="showPassword = !showPassword"></BaseTextField>

      <BaseBtnPrimary block class="mb-8 mt-8" @click="onSubmit">
        Registrati
      </BaseBtnPrimary>
    </v-form>
    <v-card-text class="text-center pb-0">
      <BaseLink to="/">
        Sei già registrato<v-icon icon="mdi-chevron-right"></v-icon>
      </BaseLink>
    </v-card-text>
  </BaseCard>
</template>