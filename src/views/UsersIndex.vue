<script setup lang="ts">
import BaseContainer from './../components/base/BaseContainer.vue'
import BasePageTitle from './../components/base/BasePageTitle.vue'
import BasePageActions from './../components/base/BasePageActions.vue'
import TheUsersTable from './../components/TheUsersTable.vue'
import router from "../router/index"

const addItem = () => {
  router.push('users/add')
}
</script>

<template>
  <main>
    <BaseContainer>
      <BasePageTitle>Utenti</BasePageTitle>
      <BasePageActions :onAdd="addItem"/>
      <TheUsersTable />
    </BaseContainer>
  </main>
</template>
