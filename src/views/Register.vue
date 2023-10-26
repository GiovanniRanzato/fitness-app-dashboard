<script setup lang="ts">
import {ref} from 'vue'
const email = ref('')
const password = ref('')
const passwordCounter = 8
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
</script>
<template>
  <main>
  <v-sheet width="300" class="mx-auto">
    <v-form ref="login-form">
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="Name"
        required
      ></v-text-field>
      <v-text-field
        v-model="password"
        :counter="passwordCounter"
        :rules="passwordRules"
        label="Password"
        required
      ></v-text-field>
    </v-form>
  </v-sheet>
  </main>
</template>