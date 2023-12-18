<script setup lang="ts">
import { ref, computed } from "vue"
import BaseContainer from './../../components/base/BaseContainer.vue'
import BasePageTitle from './../../components/base/BasePageTitle.vue'
import BaseBtnPrimary from './../../components/base/BaseBtnPrimary.vue'
import BaseBtnSecondary from './../../components/base/BaseBtnSecondary.vue'
import CardDetailCard from '../../components/CardDetailCard.vue'
import BaseAlertWarning from '../../components/base/BaseAlertWarning.vue'
import { useCardsStore } from "../../stores/cards"
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()
const props = defineProps({
    id: {
        type: String,
        required: true,
    }
})
const cardsStore = useCardsStore()
const cardAttributesValues = computed(() => cardsStore.getCardAttributesValuesById(props.id))
const currentStepIndex = ref(1)
const next = () => {
    currentStepIndex.value++
}
const prev = () => {
    currentStepIndex.value--
}

</script>
<template>
    <BaseContainer>
        <BasePageTitle title="Visualizza esercizio" />
        <template v-if="cardAttributesValues">
            <h2 class="text-h2">{{ cardAttributesValues.name }}</h2>
            <v-chip-group class="mb-3">
                <v-chip prepend-icon="mdi-calendar-start" variant="flat" class="bg-blue">{{ cardAttributesValues.dateFrom }}</v-chip>
                <v-chip prepend-icon="mdi-calendar-end" variant="flat" class="bg-blue">{{ cardAttributesValues.dateTo }}</v-chip> 
            </v-chip-group>
            <v-stepper 
                flat 
                alt-labels 
                :mobile="mobile"
                color="blue"
                :items="cardAttributesValues.cardDetails.map(el => el.exercise.name)"
                v-model="currentStepIndex"
                >
                <v-stepper-window>
                    <CardDetailCard :card-detail="cardAttributesValues.cardDetails[currentStepIndex-1]"></CardDetailCard>
                </v-stepper-window>
                <template v-slot:prev>
                    <v-btn v-if="mobile" icon="mdi-chevron-left" color="blue" @click="prev" size="large"/>
                    <BaseBtnSecondary v-else prepend-icon="mdi-chevron-left"  @click="prev">Precedente"</BaseBtnSecondary>
                </template>
                <template v-slot:next>
                    <v-btn v-if="mobile" icon="mdi-chevron-right" @click="next" size="large"/>
                    <BaseBtnPrimary v-else append-icon="mdi-chevron-right" @click="next">Successivo</BaseBtnPrimary>
                    
                </template>
            </v-stepper>
        </template>
        <BaseAlertWarning v-else>Si è verificato un problema: dati esercizio non presenti.</BaseAlertWarning>
    </BaseContainer>
</template>
<style scoped>
.cs-text-break-word {
    overflow-wrap:break-word;
    display:flex
}
.v-window {
    margin-left: 0;
    margin-right: 0;

}
</style>