<script setup lang="ts">
import { ref } from 'vue'
import BaseLink from '../components/base/BaseLink.vue'
import BaseBtnPrimary from '../components/base/BaseBtnPrimary.vue'
import BaseTextField from '../components/base/BaseTextField.vue'
import BaseInputLabel from '../components/base/BaseInputLabel.vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()

const form = ref(false)
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)
function required(v: string) {
  return !!v || 'Field is required'
}

function onSubmit() {
  authStore.login({email: email.value, password: password.value})
}
</script>
<template>
  <v-card class="pa-12 mx-auto" elevation="6" rounded="xl" max-width="448">
    <v-form v-model="form">
      <BaseInputLabel>Email</BaseInputLabel>
      <BaseTextField v-model="email" :readonly="loading" :rules="[required]" clearable placeholder="example@email.com"
        prepend-inner-icon="mdi-email-outline"></BaseTextField>

      <BaseInputLabel class="d-flex align-center justify-space-between">
        Password
      </BaseInputLabel>
      <BaseTextField v-model="password" :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
        :type="showPassword ? 'text' : 'password'" placeholder="Enter your password" prepend-inner-icon="mdi-lock-outline"
        :readonly="loading" :rules="[required]" @click:append-inner="showPassword = !showPassword"></BaseTextField>
      <BaseBtnPrimary block class="mt-8" :disabled="!form" @click="onSubmit">
        Accedi
      </BaseBtnPrimary>
    </v-form>
    <v-card-text class="text-center pb-0">
        <BaseLink to="/register">
          Registrati<v-icon icon="mdi-chevron-right"></v-icon>
        </BaseLink>
        <BaseLink to="/forgot-password">
          Password dimenticata<v-icon icon="mdi-chevron-right"></v-icon>
        </BaseLink>
      </v-card-text>
  </v-card>
</template>