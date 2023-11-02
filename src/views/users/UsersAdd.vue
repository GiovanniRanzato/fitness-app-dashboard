<script setup lang="ts">
import BaseContainer from './../../components/base/BaseContainer.vue'
import BasePageTitle from './../../components/base/BasePageTitle.vue'
import TheUserForm from './TheUserForm.vue'
import { useUsersStore } from "../../stores/users"
import router from "../../router/index"

import type { User } from '@/interfaces'

const usersStore = useUsersStore()

const save = (user: User) => {
    user.id = Math.floor(Math.random() * 1000000001);
    usersStore.addUser(user)
    router.push({ name: 'users-edit', params: { id: user.id } });
}
</script>

<template>
  <main>
    <BaseContainer>
      <BasePageTitle>Crea nuovo utente</BasePageTitle>
      <TheUserForm :onSubmit="save"/>
    </BaseContainer>
  </main>
</template>