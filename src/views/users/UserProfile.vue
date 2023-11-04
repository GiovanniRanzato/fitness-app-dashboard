<script setup lang="ts">
import { useAuthStore } from '../../stores/auth';

import BaseAvatar from './../../components/base/BaseAvatar.vue'
import BaseContainer from './../../components/base/BaseContainer.vue'
import BasePageTitle from './../../components/base/BasePageTitle.vue'
import TheUserForm from './TheUserForm.vue'

import type { User } from '@/interfaces'

const authStore = useAuthStore()

const save = (user: User) => {
    authStore.update(user)
}
</script>

<template>
  <main>
    <BaseContainer>
      <BasePageTitle title="Profilo utente"/>
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
      <TheUserForm :user="authStore.getAttributesValues" :onSubmit="save"/>
    </BaseContainer>
  </main>
</template>