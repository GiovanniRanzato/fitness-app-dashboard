<script setup lang="ts">
import { useAuthStore } from '../stores/auth';
import BaseAvatar from './../components/base/BaseAvatar.vue'
import TheUserForm from '../components/TheUserForm.vue'
const authStore = useAuthStore()
</script>

<template>
  <main>
    <v-container style="max-width: 1200px">
      <h1 class="text-h3 mb-6">Profilo utente</h1>
      <v-sheet class="text-center mx-auto" width="100%">
        <BaseAvatar 
        :avatar="authStore.avatar"
        :name="authStore.name" 
        :lastName="authStore.lastName"
        :color="authStore.getColor" size="80" />
        <div class="text-h4 mt-6">{{ authStore.getCompleteName }}</div>
        <div class="text-h6 text-grey-darken-1">{{ authStore.email }}<v-chip :color="authStore.getColor" class="ml-1">{{ authStore.getRole }}</v-chip></div>
      </v-sheet>
      <v-divider class="mt-6 mb-6"/>
      <TheUserForm />
    </v-container>
  </main>
</template>
../stores/auth