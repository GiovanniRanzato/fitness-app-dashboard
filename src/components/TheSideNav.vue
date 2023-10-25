<script setup lang="ts">
import router from "../router/index"
import { useUserStore } from '../stores/user';
import BaseAvatar from './BaseComponents/BaseAvatar.vue'
const userStore = useUserStore()

const menu = [
    {
        icon: "mdi-account-multiple",
        key: "users",
        route: "users",
        label: "Utenti"
    },
    {
        icon: "mdi-cards",
        key: "cards",
        route: "cards",
        label: "Schede"
    },
    {
        icon: "mdi-run",
        key: "exercises",
        route: "exercises",
        label: "Esercizi"
    },
]
const itemRounded = "xl"
</script>
<template>
    <v-navigation-drawer class="grey-darken-3 mx-auto pa-2" theme="dark" permanent>
        <v-list 
            color="transparent"
            >
            <v-list-item 
            :title="userStore.getCompleteName" 
            @click="router.push('/')"
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
            <v-list-item v-for="item in menu" 
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
                <v-btn block>
                    Logout
                </v-btn>
            </div>
        </template>
    </v-navigation-drawer>
</template>