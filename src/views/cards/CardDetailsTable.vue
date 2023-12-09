<script setup lang="ts">
import { useCardsStore } from "../../stores/cards"
import { useAuthStore } from '../../stores/auth'
import BaseTableBtnEdit from "../../components/base/BaseTableBtnEdit.vue"
import BaseTableBtnDelete from "../../components/base/BaseTableBtnDelete.vue"


import BaseAlertInfo from "../../components/base/BaseAlertInfo.vue"
import router from "../../router/index"
import { cardData } from '@/services/cardData'
import type { Card } from '@/interfaces'

const props = defineProps({
    card: {
    type: Object as () => Card,
    required: false,
    default: cardData.emptyCard()
  },
})

const authStore = useAuthStore()


const editCard = (cardId: string) => { 
  // router.push({ name: 'card-detail-edit', params: { id: cardId } })
}
const deleteCard = (userId: string) =>{ 
  // cardsStore.deleteCardDetail(cardDetailId)
}

</script>
<template>
  <BaseAlertInfo v-if="!card.cardDetails || card.cardDetails.length == 0">Nessun record presente</BaseAlertInfo>
  <v-table v-else>
    <thead>
      <tr>
        <th>Nome</th>
        <th>Quantità</th>
        <th>Durata</th>
        <th>Recupero</th>
        <th>Peso</th>
        <th class="text-right"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in card.cardDetails" :key="item.id" >
        <td>{{ item.exercise.name }}</td>
        <td>{{ item.quantity }}</td>
        <td>{{ item.timeDuration }}</td>
        <td>{{ item.timeRecovery }}</td>
        <td>{{ item.weight }}</td>
        <td class="text-right"><v-col cols="auto">
            <BaseTableBtnEdit v-if="authStore.canUpdateCardDetails" @click="()=> editCard(item.id)"/>
            <BaseTableBtnDelete v-if="authStore.canDeleteCardDetails" :onConfirmDelete="() => deleteCard(item.id)" />
        </v-col></td>
      </tr>
    </tbody>
  </v-table>
  <v-divider class="mb-6"></v-divider>
</template>