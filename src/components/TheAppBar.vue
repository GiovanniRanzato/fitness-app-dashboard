<script setup lang="ts">
import { useUiStore } from '../stores/ui';
import router from "../router/index"
import TheSearchInput from "../components/TheSearchInput.vue"

const uiStore = useUiStore()

function toggleSideNav(){
    uiStore.toggleSideNav()
}

</script>
<template>
    <v-app-bar :elevation="2">
        <template v-slot:prepend>
            <v-btn icon @click="router.back">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        </template>
        <v-app-bar-title>{{ uiStore.getPageTitle }}</v-app-bar-title>
        <template v-slot:append>
            <TheSearchInput v-if="uiStore.onSearch" :onSearch="uiStore.onSearch" class="mr-3"/>
            <v-app-bar-nav-icon @click="toggleSideNav"></v-app-bar-nav-icon>
        </template>
    </v-app-bar>
</template>