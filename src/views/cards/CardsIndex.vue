<script setup lang="ts">
import BaseContainer from './../../components/base/BaseContainer.vue'
import BasePageTitle from './../../components/base/BasePageTitle.vue'
import BasePageActions from './../../components/base/BasePageActions.vue'
import CardsTable from './CardsTable.vue'
import router from "../../router/index"
import { useAuthStore } from '../../stores/auth'
import { useCardsStore } from '../../stores/cards'
import { useUiStore } from '../../stores/ui'

const uiStore = useUiStore()
const authStore = useAuthStore()
const cardStore = useCardsStore()

uiStore.onSearch = (search: string) => cardStore.retrieveCards(search, 1)

const addItem = () => {
  router.push('cards/add')
}
</script>

<template>
  <main>
    <BaseContainer>
      <BasePageTitle title="Schede" />
      <BasePageActions v-if="authStore.canCreateCards" :onAdd="addItem"/>
      <CardsTable />
    </BaseContainer>
  </main>
</template>