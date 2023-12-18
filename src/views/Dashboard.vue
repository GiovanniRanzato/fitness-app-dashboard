<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheSideNav from '../components/TheSideNav.vue'
import TheAppBar from '../components/TheAppBar.vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
if(!authStore.isLogin) authStore.logout()
</script>

<template>
    <v-app>
        <TheSideNav />
        <TheAppBar />
        <v-main>
            <v-sheet width="100%" min-height="100vh" class="mx-auto">
                <RouterView />
            </v-sheet>
        </v-main>
    </v-app>
</template>
