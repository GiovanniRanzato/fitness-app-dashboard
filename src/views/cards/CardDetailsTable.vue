<script setup lang="ts">
import { useCardsStore } from "../../stores/cards"
import { useAuthStore } from '../../stores/auth'
import BaseTableBtnEdit from "../../components/base/BaseTableBtnEdit.vue"
import BaseTableBtnDelete from "../../components/base/BaseTableBtnDelete.vue"
import BaseAlertInfo from "../../components/base/BaseAlertInfo.vue"
import { cardData } from '@/services/cardData'
import type { Card } from '@/interfaces'

const props = defineProps({
    card: {
    type: Object as () => Card,
    required: false,
    default: cardData.emptyCard()
  },
  onEditCardDetail: {
    type: Function,
    required: true
  },
})

const authStore = useAuthStore()
const cardsStore = useCardsStore()

const deleteCardDetail = (cardDetailId: string) =>{ 
  cardsStore.deleteCardDetail(cardDetailId, props.card.id)
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
            <BaseTableBtnEdit v-if="authStore.canUpdateCardDetails" @click="()=> onEditCardDetail(item)"/>
            <BaseTableBtnDelete v-if="authStore.canDeleteCardDetails" :onConfirmDelete="() => deleteCardDetail(item.id)" />
        </v-col></td>
      </tr>
    </tbody>
  </v-table>
  <v-divider class="mb-6"></v-divider>
</template>