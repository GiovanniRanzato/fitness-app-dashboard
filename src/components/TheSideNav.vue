<script setup lang="ts">
import router from "../router/index"
const menu = [
    {
        icon: "mdi-account-multiple",
        key: "users",
        route: "users",
        label: "Gestione utente"
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
</script>
<template>
    <v-navigation-drawer class="grey-darken-3" theme="dark" permanent>
        <v-list color="transparent">
            <v-list-item v-for="item in menu" 
            :prepend-icon="item.icon" 
            :title="item.label" 
            :key="item.key"
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