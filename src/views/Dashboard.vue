<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheSideNav from "../components/TheSideNav.vue"
</script>

<template>
    <v-layout full-height>
        <TheSideNav />
        <v-main>
          <v-sheet width="100%" min-height="100vh" class="pa-4 mx-auto">
            <RouterView />
          </v-sheet>
        </v-main>
    </v-layout>
</template>
