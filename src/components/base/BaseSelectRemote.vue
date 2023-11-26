<script setup lang="ts">
import { ref } from 'vue'

import type { SelectItem } from '@/interfaces'

const props = defineProps({
    options: {
        type: Object as () => SelectItem[],
        required: false
    },
    onSearch: {
        type: Function,
        required: true
    },
})

let searchTimeout: any = null

const searchFunction = (value: String) => {
    if (searchTimeout) {
        clearTimeout(searchTimeout)
    }
    searchTimeout = setTimeout(() => {
        props.onSearch(value)
    }, 500)
}
</script>
<template>
    <v-autocomplete 
    variant="outlined" density="compact" rounded="xl" color="blue"
    :items="options"
    @update:search="(value) => searchFunction(value)"></v-autocomplete>
</template>