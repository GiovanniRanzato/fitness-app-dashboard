<script setup lang="ts">
import BaseCard from './base/BaseCard.vue'
import BaseYouTubeVideoIFrame from './base/BaseYouTubeVideoIFrame.vue'
import BaseAlertInfo from './base/BaseAlertInfo.vue'

import type { CardDetail } from '@/interfaces'

const props = defineProps({
    cardDetail: {
        type: Object as () => CardDetail,
        required: true,
    }
})

const formatText = (text: string) => {
    return text ? text.replace(/\n/g, "<br>") : null;
}
</script>
<template>
    <BaseCard :title="cardDetail.exercise.name">
        <v-card-item>
            <v-chip-group>
                <v-chip v-if="cardDetail.quantity" prepend-icon="mdi-numeric" >Quantità: {{ cardDetail.quantity }}</v-chip>
                <v-chip v-if="cardDetail.weight" prepend-icon="mdi-weight" >Peso: {{ cardDetail.weight }}</v-chip>
                <v-chip v-if="cardDetail.timeDuration" prepend-icon="mdi-timer-play-outline">Durata: {{ cardDetail.timeDuration }}</v-chip>
                <v-chip v-if="cardDetail.timeRecovery" prepend-icon="mdi-timer-pause-outline">Recupero: {{ cardDetail.timeRecovery }}</v-chip>
            </v-chip-group>
        </v-card-item>
        <BaseAlertInfo v-if="cardDetail.notes"><div class="cs-text-break-word" v-html="formatText(cardDetail.notes)"></div></BaseAlertInfo>
        <v-card-item class="cs-text-break-word" v-html="formatText(cardDetail.exercise.description)" />
        <v-card-item v-if="cardDetail.exercise.notes">
            <BaseAlertInfo><div class="cs-text-break-word" v-html="formatText(cardDetail.exercise.notes)"></div></BaseAlertInfo>
        </v-card-item>
        <v-card-item v-if="cardDetail.exercise.mediaUrl">
            <BaseYouTubeVideoIFrame :mediaUrl="cardDetail.exercise.mediaUrl" />
        </v-card-item>
    </BaseCard>
</template>
<style scoped>
.cs-text-break-word {
    overflow-wrap:break-word;
    display:flex
}
</style>