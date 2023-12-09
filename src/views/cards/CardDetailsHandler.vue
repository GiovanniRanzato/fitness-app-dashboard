<script setup lang="ts">
import { ref } from 'vue'
import BaseBtnSecondary from '../../components/base/BaseBtnSecondary.vue'
import BaseCard from '../../components/base/BaseCard.vue'
import CardDetailsTable from './CardDetailsTable.vue';
import CardDetailForm from './CardDetailForm.vue'
import { cardData } from '@/services/cardData'
import { cardDetailData } from '@/services/cardDetailData'
import { useCardsStore } from "../../stores/cards"

import type { Card, CardDetail } from '@/interfaces'

const props = defineProps({
    card: {
    type: Object as () => Card,
    required: false,
    default: cardData.emptyCard()
  },
})

const cardStore = useCardsStore()
const openDialog = ref(false)
const dialogTitle = ref('')
const editingCardDetail = ref(cardDetailData.emptyCardDetail())

const onAddCardDetail = () => {
    editingCardDetail.value = cardDetailData.emptyCardDetail()
    dialogTitle.value = "Aggiungi riga esercizio"
    openDialog.value = true
}
const onEditCardDetail = (cardDetail: CardDetail) => {
    editingCardDetail.value = cardDetailData.emptyCardDetail()
    dialogTitle.value = "Modifica riga esercizio"
    editingCardDetail.value = cardDetail
    openDialog.value = true
}

const submitAddCardDetail = (value: CardDetail) => {
    cardStore.addCardDetail(value, props.card.id)
    openDialog.value = false
}

</script>
<template>
    <div class="d-flex justify-end mb-6">
      <BaseBtnSecondary @click="onAddCardDetail" prepend-icon="mdi-plus">
        Aggiungi esercizio
      </BaseBtnSecondary>
    </div>
    <v-dialog
        v-model="openDialog" width="800">
        <BaseCard :title="dialogTitle">
            <v-card-item class="mb-6">
                <CardDetailForm :onSubmit="submitAddCardDetail"/>
            </v-card-item>
        </BaseCard>
    </v-dialog>
    <CardDetailsTable :card="card"/>
</template>