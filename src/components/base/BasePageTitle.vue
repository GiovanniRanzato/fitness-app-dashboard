<script setup lang="ts">
import { useUiStore} from "../../stores/ui"

const props = defineProps({
    title: {
        type: String,
        required: true
    }
})
const uiStore = useUiStore()
uiStore.setPageTitle(props.title)
</script>
<template>
</template>