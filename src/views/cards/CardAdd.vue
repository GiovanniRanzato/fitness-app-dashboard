<script setup lang="ts">
import BaseContainer from './../../components/base/BaseContainer.vue'
import BasePageTitle from './../../components/base/BasePageTitle.vue'
import CardForm from './CardForm.vue'
import { useCardsStore } from "../../stores/cards"

import type { Card } from '@/interfaces'

const cardStore = useCardsStore()

const save = (card: Card) => {
  cardStore.addCard(card)
}
</script>

<template>
  <main>
    <BaseContainer>
      <BasePageTitle title="Crea nuova scheda"/>
      <CardForm :onSubmit="save" :isCreate="true"/>
    </BaseContainer>
  </main>
</template>