<script setup lang="ts">
import { ref } from 'vue'
import BaseBtnPrimary from './BaseBtnPrimary.vue'
import BaseBtnSecondary from './BaseBtnSecondary.vue'

const props = defineProps({
    onConfirmDelete: {
        type: Function,
        required: true
    }
})

const showConfirmDialog = ref(false)
</script>

<template>
    <v-menu v-model="showConfirmDialog" :close-on-content-click="true" location="bottom" >
        <template v-slot:activator="{ props }">
            <v-btn icon="mdi-delete" class="text-red" variant="flat" size="small" v-bind="props"></v-btn>
        </template>
        <v-card min-width="300" class="pa-3 mt-1">
            <v-card-text>Sicuro di voler eliminare l'elemento selezionato?</v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <BaseBtnSecondary variant="text" @click="() => showConfirmDialog = false">
                    Annulla
                </BaseBtnSecondary>
                <BaseBtnPrimary @click="() => onConfirmDelete()">
                    Conferma
                </BaseBtnPrimary>
            </v-card-actions>
        </v-card>
    </v-menu>
</template>