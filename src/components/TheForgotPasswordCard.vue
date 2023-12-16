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

const loading = ref(false)
const emailRules = [
  (v: string) => !!v || 'Email è richiesta',
  (v: string) => /.+@.+\..+/.test(v) || 'Deve essere un indirizzo email valido',
]

function onSubmit() {
  authStore.sendResetLinkEmail(email.value)
}
</script>
<template>
  <v-card class="pa-12 mx-auto" elevation="6" rounded="xl" max-width="448">
    <v-form v-model="form">
      <BaseInputLabel>Email</BaseInputLabel>
      <BaseTextField v-model="email" :readonly="loading" :rules="emailRules" clearable placeholder="example@email.com"
        prepend-inner-icon="mdi-email-outline"></BaseTextField>

      <BaseBtnPrimary block class="mt-8" :disabled="!form" @click="onSubmit">
        Reset password
      </BaseBtnPrimary>
    </v-form>
    <v-card-text class="text-center pb-0">
        <BaseLink to="/">
            <v-icon icon="mdi-chevron-left"></v-icon>Torna al login
        </BaseLink>
      </v-card-text>
  </v-card>
</template>