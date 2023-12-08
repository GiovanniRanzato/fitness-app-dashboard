<script setup lang="ts">
import BaseContainer from './../../components/base/BaseContainer.vue'
import BasePageTitle from './../../components/base/BasePageTitle.vue'
import BaseAlertWarning from './../../components/base/BaseAlertWarning.vue'

import CardForm from './CardForm.vue'
import { useCardsStore } from "../../stores/cards"

import type { Card } from '@/interfaces'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})
const cardsStore = useCardsStore()

const save = (card: Card) => {
  cardsStore.updateCard(card)
}
const cardAttributesValues = cardsStore.getCardAttributesValuesById(props.id)
</script>

<template>
  <main>
    <BaseContainer>
      <BasePageTitle title="Modifica scheda"/>
      <CardForm v-if="cardAttributesValues" :card="cardAttributesValues" :onSubmit="save" />
      <BaseAlertWarning v-else>Si è verificato un problema: dati scheda non presenti.</BaseAlertWarning>
    </BaseContainer>
  </main>
</template>