<script setup lang="ts">
    const props = defineProps({
        maxWidth: {
            type: Number,
            required: false,
            default: 100
        },
    })
</script>

<template>
    <v-img class="mx-auto my-6" :max-width="maxWidth"
        src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"></v-img>
</template>