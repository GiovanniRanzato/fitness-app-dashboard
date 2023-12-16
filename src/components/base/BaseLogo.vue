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

const baseURL = import.meta.env.BASE_URL  as string;

function getSrc() {
    switch(props.theme) {
        case 'dark': 
            return baseURL+"img/logo3.png"
        case 'light':
        default:
            return baseURL+"img/logo2.png"

    }
}

</script>

<template>
    <v-img class="mx-auto my-6" :max-width="maxWidth"
        :src="getSrc()"></v-img>
</template>

