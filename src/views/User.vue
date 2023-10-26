<script setup lang="ts">
import { useUserStore } from '../stores/user';
import BaseBtnPrimary from './../components/base/BaseBtnPrimary.vue'
import BaseBtnSecondary from './../components/base/BaseBtnSecondary.vue'

const userStore = useUserStore()
</script>

<template>
  <main>
    User: {{ userStore.id }} panel with personal informations and action to update
    <BaseBtnPrimary>Test</BaseBtnPrimary> <BaseBtnSecondary>Test</BaseBtnSecondary>
  </main>
</template>
