<script setup lang="ts">
import BaseContainer from './../../components/base/BaseContainer.vue'
import BasePageTitle from './../../components/base/BasePageTitle.vue'
import BaseCard from '../../components/base/BaseCard.vue'
import BaseAvatar from '../../components/base/BaseAvatar.vue'
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
            <h2 class="text-h2">{{ cardAttributesValues.name }}</h2>
            <v-chip-group>
                <v-chip prepend-icon="mdi-calendar-start" color="blue">{{ cardAttributesValues.dateFrom }}</v-chip>
                <v-chip prepend-icon="mdi-calendar-end" color="blue">{{ cardAttributesValues.dateTo }}</v-chip> 
            </v-chip-group>

                


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