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
    required: true
  },
})

const cardStore = useCardsStore()
const openDialog = ref(false)
const dialogTitle = ref('')
const editingCardDetail = ref(cardDetailData.emptyCardDetail())

const onAddCardDetail = () => {
    editingCardDetail.value = cardDetailData.emptyCardDetail()
    dialogTitle.value = "Aggiungi dettaglio esercizio"
    openDialog.value = true
}
const onEditCardDetail = (cardDetail: CardDetail) => {
    console.log(cardDetail)
    dialogTitle.value = "Modifica dettaglio esercizio"
    editingCardDetail.value = cardDetail
    openDialog.value = true
}

const submitCardDetailForm = (value: CardDetail) => {
    if(!value.id) cardStore.addCardDetail(value, props.card.id)
    else cardStore.updateCardDetail(value, props.card.id)
    openDialog.value = false
}

</script>
<template>
    <div class="d-flex justify-end mb-6">
      <BaseBtnSecondary @click="onAddCardDetail" prepend-icon="mdi-plus">
        Aggiungi dettaglio esercizio
      </BaseBtnSecondary>
    </div>
    <v-dialog
        v-model="openDialog" width="800">
        <BaseCard :title="dialogTitle">
            <v-card-item class="mb-6">
                <CardDetailForm :cardDetail="editingCardDetail" :onSubmit="submitCardDetailForm"/>
            </v-card-item>
        </BaseCard>
    </v-dialog>
    <CardDetailsTable :card="card" :onEditCardDetail="onEditCardDetail" />
</template>