<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <v-layout>
        <v-navigation-drawer v-model="drawer" :rail="rail" permanent @click="rail = false">
            <v-list-item prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg" title="John Leider" nav>
                <template v-slot:append>
                    <v-btn variant="text" icon="mdi-chevron-left" @click.stop="rail = !rail"></v-btn>
                </template>
            </v-list-item>

            <v-divider></v-divider>

            <v-list density="compact" nav>
                <v-list-item prepend-icon="mdi-home-city" title="Users" value="users"></v-list-item>
                <v-list-item prepend-icon="mdi-account" title="Cards" value="cards"></v-list-item>
                <v-list-item prepend-icon="mdi-account-group-outline" title="Exercises" value="exercise"></v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-main>
            <v-sheet width="100%" min-height="100vh" class="pa-4 mx-auto">
                <RouterView />
            </v-sheet>
            <v-footer class="bg-grey-lighten-1">
                <v-row justify="center" no-gutters>
                    <v-btn v-for="link in links" :key="link" color="white" variant="text" class="mx-2" rounded="xl">
                        {{ link }}
                    </v-btn>
                    <v-col class="text-center mt-4" cols="12">
                        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
                    </v-col>
                </v-row>
            </v-footer>
        </v-main>
    </v-layout>
</template>
<script lang="ts">
export default {
    data() {
        return {
            drawer: true,
            rail: true,
            links: ['Termini servizio', 'Privacy policy'],
        }
    },
}
</script>

