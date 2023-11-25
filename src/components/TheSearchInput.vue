<script setup lang="ts">
import { ref } from "vue"
import BaseTextField from "../components/base/BaseTextField.vue"

const props = defineProps({
    onSearch: {
        type: Function,
        required: true
    }
})
const searchInput = ref('')
const searchFunction = () => {
    props.onSearch(searchInput.value)
}

</script>

<template>
    <BaseTextField 
    v-if="onSearch" 
    v-model="searchInput" 
    style="min-width:180px;" 
    placeholder="Cerca..." 
    prepend-inner-icon="mdi-magnify"
    clearable hide-details
    @input="searchFunction"
    @click:clear="searchFunction"
    ></BaseTextField>
</template>