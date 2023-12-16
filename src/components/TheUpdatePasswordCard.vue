<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import BaseLink from '../components/base/BaseLink.vue'
import BaseBtnPrimary from '../components/base/BaseBtnPrimary.vue'
import BaseTextField from '../components/base/BaseTextField.vue'
import BaseInputLabel from '../components/base/BaseInputLabel.vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const route = useRoute()
  
const form = ref(false)
const loading = ref(false)

const email = ref('')
const password = ref('')
const passwordConfirm = ref('')
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
const confirmPasswordRules = [(v: string) => v == password.value|| 'Le password devono coincidere']

function onSubmit() {
  if (!form.value) 
    return false;
  authStore.updatePassword({email: email.value, password: password.value, passwordConfirm: passwordConfirm.value, token: route.query.token as string})
}
</script>
<template>
  <v-card class="pa-12 mx-auto" elevation="6" rounded="xl" max-width="448">
    <v-form v-model="form">
      <BaseInputLabel>Email</BaseInputLabel>
      <BaseTextField v-model="email" :readonly="loading" :rules="emailRules" clearable placeholder="example@email.com"
        prepend-inner-icon="mdi-email-outline"></BaseTextField>
        
      <BaseInputLabel>Password</BaseInputLabel>
      <BaseTextField v-model="password" :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
        :type="showPassword ? 'text' : 'password'" placeholder="Enter your password" prepend-inner-icon="mdi-lock-outline"
        :readonly="loading" :rules="passwordRules" @click:append-inner="showPassword = !showPassword"></BaseTextField>

      <BaseInputLabel>Conferma password</BaseInputLabel>
      <BaseTextField v-model="passwordConfirm" :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
        :type="showPassword ? 'text' : 'password'" placeholder="Confirm your password" prepend-inner-icon="mdi-lock-outline"
        :readonly="loading" :rules="[...passwordRules, ...confirmPasswordRules]" @click:append-inner="showPassword = !showPassword"></BaseTextField>
      <BaseBtnPrimary block class="mb-8 mt-8" :disabled="!form" @click="onSubmit">
        Modifica password
      </BaseBtnPrimary>
    </v-form>
    <v-card-text class="text-center pb-0">
      <BaseLink to="/"><v-icon icon="mdi-chevron-left"></v-icon>Torna al login</BaseLink>
    </v-card-text>
  </v-card>
</template>