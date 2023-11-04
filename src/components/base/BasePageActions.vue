<script setup lang="ts">
import BasePageAction from './BasePageAction.vue';
import BaseBtnPrimary from './BaseBtnSecondary.vue';
const props = defineProps({
        onAdd: {
            type: Function,
        }
    })
</script>

<template>
    <div class="d-flex justify-end">
        <BasePageAction v-if="props.onAdd"  @click="props.onAdd()">
            Aggiungi nuovo
        </BasePageAction>
    </div>
</template>
