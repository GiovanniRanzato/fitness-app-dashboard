<script setup lang="ts">
import {ref} from 'vue'
import BaseLink from '../components/base/BaseLink.vue'

const email = ref('')
const password = ref('')
const showPassword =ref(false)
const loading = ref(false)
function required (v: string) {
  return !!v || 'Field is required'
}

function onSubmit() {
  console.log(email.value,password.value)
}
</script>
<template>
    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <div class="text-subtitle-1 text-medium-emphasis mb-1">Email</div>

      <v-text-field
        rounded="xl"
        v-model="email"
        :readonly="loading"
        :rules="[required]"
        clearable
        density="compact"
        placeholder="example@email.com"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between mb-1">
        Password

        <a v-if="false"
          class="text-caption text-decoration-none text-blue"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
        >
          Forgot login password?</a>
      </div>

      <v-text-field
        rounded="xl"
        v-model="password"
        :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
        :type="showPassword ? 'text' : 'password'"
        density="compact"
        placeholder="Enter your password"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        :readonly="loading"
        :rules="[required]"
        @click:append-inner="showPassword = !showPassword"
      ></v-text-field>
      <v-btn
        block
        class="mb-8 mt-8"
        color="blue"
        size="large"
        variant="tonal"
        rounded="xl"
        @click="onSubmit"
      >
        Accedi
      </v-btn>

      <v-card-text class="text-center">
        <BaseLink to="/register">
          Non sei registrato<v-icon icon="mdi-chevron-right"></v-icon>
        </BaseLink>
      </v-card-text>
    </v-card>
</template>