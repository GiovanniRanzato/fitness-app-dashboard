<script setup lang="ts">
import { RouterLink } from 'vue-router';
const props = defineProps({
        to: {
            type: String,
            required: true
        }
    })
</script>
<template>
    <RouterLink class="text-blue text-decoration-none" :to="to">
        <slot default></slot>
    </RouterLink>
</template>