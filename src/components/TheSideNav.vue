<script setup lang="ts">
import router from "../router/index"
import { useUserStore } from '../stores/user';
import BaseAvatar from './base/BaseAvatar.vue'
import BaseLogo from './base/BaseLogo.vue'

const userStore = useUserStore()

const navItems = [
    {
        icon: "mdi-account-multiple",
        key: "users",
        route: "/dashboard/users",
        label: "Utenti"
    },
    {
        icon: "mdi-cards",
        key: "cards",
        route: "/dashboard/cards",
        label: "Schede"
    },
    {
        icon: "mdi-run",
        key: "exercises",
        route: "/dashboard/exercises",
        label: "Esercizi"
    },
]
const itemRounded = "xl"
</script>
<template>
    <v-navigation-drawer class="mx-auto pa-2" theme="dark" permanent>
        <BaseLogo min-width="150" theme="dark" />
        <v-list 
            color="transparent"
            >
            <v-list-item 
            :title="userStore.getCompleteName" 
            @click="router.push('/dashboard/')"
            :rounded="itemRounded"
            >
                <template v-slot:prepend>
                    <BaseAvatar 
                        :avatar="userStore.avatar"
                        :name="userStore.name"
                        :lastName="userStore.lastName"
                        :color="userStore.getColor"
                    /></template>
                <template v-slot:subtitle><v-chip size="small" :color="userStore.getColor" class="mt-1">{{ userStore.getRole }}</v-chip></template>
            </v-list-item>

            <v-divider class="mt-3 mb-3"></v-divider>
            <v-list-item v-for="item in navItems" 
            :prepend-icon="item.icon" 
            :title="item.label" 
            :key="item.key"
            :rounded="itemRounded"
            @click="router.push(item.route)"
            >
        </v-list-item>
        </v-list>

        <template v-slot:append>
            <div class="pa-2">
                <v-btn 
                    block
                    prepend-icon="mdi-exit-to-app" 
                    @click="router.push('/')"
                >Logout
                </v-btn>
            </div>
        </template>
    </v-navigation-drawer>
</template>