<script setup lang="ts">
import BaseContainer from './../../components/base/BaseContainer.vue'
import BasePageTitle from './../../components/base/BasePageTitle.vue'
import BasePageActions from './../../components/base/BasePageActions.vue'
import TheUsersTable from './TheUsersTable.vue'
import router from "../../router/index"
import { useAuthStore } from '../../stores/auth'

const authStore = useAuthStore()

const addItem = () => {
  router.push('users/add')
}
</script>

<template>
  <main>
    <BaseContainer>
      <BasePageTitle title="Utenti" />
      <BasePageActions v-if="authStore.canCreateUser" :onAdd="addItem"/>
      <TheUsersTable />
    </BaseContainer>
  </main>
</template>
