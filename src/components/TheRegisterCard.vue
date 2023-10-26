<script setup lang="ts">
import { ref } from 'vue'
import BaseLink from '../components/base/BaseLink.vue'

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
  (v: string) => v.length >= passwordCounter || 'La password deve contenere almeno ${passwordCounter} caratteri',
  (v: string) => /[a-z]/.test(v) || 'La password deve contenere almeno una lettera minuscola',
  (v: string) => /[A-Z]/.test(v) || 'La password deve contenere almeno una lettera maiuscola',
  (v: string) => /\d/.test(v) || 'La password deve contenere almeno un numero',
  (v: string) => /[^a-zA-Z0-9]/.test(v) || 'La password deve contenere almeno un carattere speciale',
]

const nameRules = [
  (v: string) => !!v || 'Il nome è richiesto',
]

function required(v: string) {
  return !!v || 'Field is required'
}

function onSubmit() {
  console.log(email.value, password.value)
}
</script>
<template>
  <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">

    <div class="text-subtitle-1 text-medium-emphasis mb-1">Nome</div>
    <v-text-field rounded="xl" v-model="name" :readonly="loading" :rules="nameRules" clearable density="compact"
      placeholder="example@email.com" prepend-inner-icon="mdi-account" variant="outlined"></v-text-field>
    
    <div class="text-subtitle-1 text-medium-emphasis mb-1">Email</div>
    <v-text-field rounded="xl" v-model="email" :readonly="loading" :rules="emailRules" clearable density="compact"
      placeholder="example@email.com" prepend-inner-icon="mdi-email-outline" variant="outlined"></v-text-field>

    <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between mb-1">
      Password
    </div>
    <v-text-field rounded="xl" v-model="password" :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
      :type="showPassword ? 'text' : 'password'" density="compact" placeholder="Enter your password"
      prepend-inner-icon="mdi-lock-outline" variant="outlined" :readonly="loading" :rules="passwordRules"
      @click:append-inner="showPassword = !showPassword"></v-text-field>
    
    <v-btn block class="mb-8 mt-8" color="blue" size="large" variant="tonal" rounded="xl" @click="onSubmit">
      Registrati
    </v-btn>

    <v-card-text class="text-center">
      <BaseLink to="/">
        Sei già registrato<v-icon icon="mdi-chevron-right"></v-icon>
      </BaseLink>
    </v-card-text>
  </v-card>
</template>