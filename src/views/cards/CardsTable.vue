<script setup lang="ts">
import { computed } from "vue"
import { useCardsStore } from "../../stores/cards"
import { useAuthStore } from '../../stores/auth'
import { useUsersStore } from '../../stores/users'
import { userData } from '@/services/userData'
import BaseTableBtnEdit from "../../components/base/BaseTableBtnEdit.vue"
import BaseTableBtnDelete from "../../components/base/BaseTableBtnDelete.vue"
import BaseTableBtnView from "../../components/base/BaseTableBtnView.vue"

import BaseAlertInfo from "../../components/base/BaseAlertInfo.vue"
import router from "../../router/index"

const cardsStore = useCardsStore()
const authStore = useAuthStore()
const usersStore = useUsersStore()

cardsStore.retrieveCards()
const cards = computed(() => cardsStore.getCards)
const metadata = cardsStore.getMetadata


const viewCard = (cardId: string) => { 
  router.push({ name: 'cards-view', params: { id: cardId } })
}
const editCard = (cardId: string) => { 
  router.push({ name: 'cards-edit', params: { id: cardId } })
}
const deleteCard = (userId: string) =>{ 
  cardsStore.deleteCard(userId)
}

const onPageChange = () => {
  cardsStore.retrieveCards()
}

</script>
<template>
  <v-table>
    <thead>
      <tr>
        <th>Nome</th>
        <th>Utente</th>
        <th class="text-right"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in cards" :key="item.id" >
        <td>{{ item.name }}</td>
        <td>{{ userData.getUserNameLastNameEmail(item.user) }}</td>

        <td class="text-right"><v-col cols="auto">
            <BaseTableBtnView @click="()=> viewCard(item.id)"/>
            <BaseTableBtnEdit v-if="authStore.canUpdateCards" @click="()=> editCard(item.id)"/>
            <BaseTableBtnDelete v-if="authStore.canDeleteCards" :onConfirmDelete="() => deleteCard(item.id)" />
        </v-col></td>
      </tr>
    </tbody>
  </v-table>
  <v-divider class="mb-6"></v-divider>
  <v-pagination
    v-if="metadata.pageTotal > 1"
    v-model="metadata.pageNumber"
    :length="metadata.pageTotal"
    active-color="blue"
    rounded="circle"
    @click="onPageChange"
  ></v-pagination>
  <BaseAlertInfo v-if="!cards || cards.length == 0">Nessun record presente</BaseAlertInfo>
</template>