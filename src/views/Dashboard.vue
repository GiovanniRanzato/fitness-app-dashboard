<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheSideNav from "../components/TheSideNav.vue"
import TheAppBar from '../components/TheAppBar.vue'
</script>

<template>
    <v-app>
        <TheSideNav />
        <TheAppBar />
        <v-main>
            <v-sheet width="100%" min-height="100vh" class="pa-8 mx-auto">
                <RouterView />
            </v-sheet>
        </v-main>
    </v-app>
</template>
