<script setup lang="ts">
const props = defineProps({
    maxWidth: {
        type: Number,
        required: false,
        default: 100
    },
    theme: {
        type: String,
        required: false,
        default: 'light'
    }
})
function getSrc() {
    switch(props.theme) {
        case 'dark': 
            return "https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-dark.svg"
        case 'light':
        default:
            return "https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"

    }
}

</script>

<template>
    <v-img class="mx-auto my-6" :max-width="maxWidth"
        :src="getSrc()"></v-img>
</template>

