<script setup lang="ts">
import { useUserStore } from '../stores/user';
const userStore = useUserStore()
</script>

<template>
  <main>
    User: {{ userStore.id }} panel with personal informations and action to update
  </main>
</template>
