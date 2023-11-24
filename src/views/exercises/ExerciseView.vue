<script setup lang="ts">
import BaseContainer from './../../components/base/BaseContainer.vue'
import BasePageTitle from './../../components/base/BasePageTitle.vue'
import BaseCard from '../../components/base/BaseCard.vue'
import BaseYouTubeVideoIFrame from '../../components/base/BaseYouTubeVideoIFrame.vue'
import BaseAlertInfo from '../../components/base/BaseAlertInfo.vue'
import { useExercisesStore } from "../../stores/exercises"


const props = defineProps({
    id: {
        type: String,
        required: true,
    }
})
const exercisesStore = useExercisesStore()
const exerciseAttributesValues = exercisesStore.getExerciseAttributesValuesById(parseInt(props.id))

const formatText = (text: string) => {
    return text.replace(/\n/g, "<br>");
}
</script>
<template>
    <BaseContainer>
        <BasePageTitle title="Visualizza esercizio" />
        <template v-if="exerciseAttributesValues">

            <BaseCard :title="exerciseAttributesValues.name">
                <v-card-item v-html="formatText(exerciseAttributesValues.description)" />
                <v-card-item v-if="exerciseAttributesValues.notes">
                    <BaseAlertInfo><div v-html="formatText(exerciseAttributesValues.notes)"></div></BaseAlertInfo>
                </v-card-item>
                <v-card-item v-if="exerciseAttributesValues.mediaUrl">
                    <BaseYouTubeVideoIFrame :mediaUrl="exerciseAttributesValues.mediaUrl" />
                </v-card-item>
            </BaseCard>

        </template>
        <BaseAlertWarning v-else>Si è verificato un problema: dati esercizio non presenti.</BaseAlertWarning>
    </BaseContainer>
</template>