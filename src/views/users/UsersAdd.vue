<script setup lang="ts">
import BaseContainer from './../../components/base/BaseContainer.vue'
import BasePageTitle from './../../components/base/BasePageTitle.vue'
import TheUserForm from './TheUserForm.vue'
import { useUsersStore } from "../../stores/users"

import type { User } from '@/interfaces'

const usersStore = useUsersStore()

const save = (user: User) => {
    usersStore.addUser(user)
}
</script>

<template>
  <main>
    <BaseContainer>
      <BasePageTitle title="Crea nuovo utente"/>
      <TheUserForm :onSubmit="save" :isCreate="true"/>
    </BaseContainer>
  </main>
</template>