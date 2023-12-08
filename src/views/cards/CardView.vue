<script setup lang="ts">
import BaseContainer from './../../components/base/BaseContainer.vue'
import BasePageTitle from './../../components/base/BasePageTitle.vue'
import BaseCard from '../../components/base/BaseCard.vue'
import { useCardsStore } from "../../stores/cards"


const props = defineProps({
    id: {
        type: String,
        required: true,
    }
})
const cardsStore = useCardsStore()
const cardAttributesValues = cardsStore.getCardAttributesValuesById(props.id)

</script>
<template>
    <BaseContainer>
        <BasePageTitle title="Visualizza esercizio" />
        <template v-if="cardAttributesValues">

            <BaseCard :title="cardAttributesValues.name">
                <v-card-item class="cs-text-break-word">
                Da: {{ cardAttributesValues.dateFrom }}
                A: {{ cardAttributesValues }}
                </v-card-item>
            </BaseCard>

        </template>
        <BaseAlertWarning v-else>Si è verificato un problema: dati esercizio non presenti.</BaseAlertWarning>
    </BaseContainer>
</template>
<style scoped>
.cs-text-break-word {
    overflow-wrap:break-word;
    display:flex
}
</style>