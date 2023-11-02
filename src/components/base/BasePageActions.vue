<script setup lang="ts">
import BasePageAction from './BasePageAction.vue';
const props = defineProps({
        onAdd: {
            type: Function,
        }
    })
</script>

<template>
    <v-row align="end" justify="end" >
        <BasePageAction v-if="props.onAdd"  icon="mdi-plus" @click="props.onAdd()"/>
    </v-row>
</template>
