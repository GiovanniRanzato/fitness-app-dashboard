<script setup lang="ts">
import { onBeforeUnmount } from 'vue'
import BaseContainer from './../../components/base/BaseContainer.vue'
import BasePageTitle from './../../components/base/BasePageTitle.vue'
import BasePageActions from './../../components/base/BasePageActions.vue'
import TheUsersTable from './TheUsersTable.vue'
import router from "../../router/index"
import { useAuthStore } from '../../stores/auth'
import { useUiStore } from '../../stores/ui'
import { useUsersStore } from '../../stores/users'

const authStore = useAuthStore()
const uiStore = useUiStore()
const userStore = useUsersStore()

const addItem = () => {
  router.push('users/add')
}
uiStore.onSearch = (search: String) => userStore.retrieveUsers(search, 1)

onBeforeUnmount(()=> {
  uiStore.onSearch = undefined
})
</script>

<template>
  <main>
    <BaseContainer>
      <BasePageTitle title="Utenti" />
      <BasePageActions v-if="authStore.canCreateUsers" :onAdd="addItem"/>
      <TheUsersTable />
    </BaseContainer>
  </main>
</template>
