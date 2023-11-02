<script setup lang="ts">
import BaseContainer from './../components/base/BaseContainer.vue'
import BasePageTitle from './../components/base/BasePageTitle.vue'
import TheUserForm from './../components/TheUserForm.vue'
import type { User } from '@/interfaces'

const saveItem = (user: User) => {
  console.log(user.name)
  console.log(user.lastName)
}
</script>

<template>
  <main>
    <BaseContainer>
      <BasePageTitle>Crea nuovo utente</BasePageTitle>
      <TheUserForm :onSubmit="saveItem"/>
    </BaseContainer>
  </main>
</template>