<script setup lang="ts">
import { useUiStore } from '../stores/ui';
const uiStore = useUiStore()

function toggleSideNav(){
    uiStore.toggleSideNav()
}

</script>
<template>
    <v-app-bar :elevation="2" class="d-none d-sm-flex d-md-flex d-lg-none">
        <template v-slot:append>
            <v-app-bar-nav-icon @click="toggleSideNav"></v-app-bar-nav-icon>
        </template>
    </v-app-bar>
</template>