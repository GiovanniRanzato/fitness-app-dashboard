<script setup lang="ts">
import { useAuthStore } from '../stores/auth';
import BaseBtnPrimary from './../components/base/BaseBtnPrimary.vue'
import BaseBtnSecondary from './../components/base/BaseBtnSecondary.vue'

const authStore = useAuthStore()
</script>

<template>
  <main>
    User: {{ authStore.userId }} panel with personal informations and action to update
    <BaseBtnPrimary>Test</BaseBtnPrimary> <BaseBtnSecondary>Test</BaseBtnSecondary>
  </main>
</template>
../stores/auth