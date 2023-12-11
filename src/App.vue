<script setup lang="ts">
import { RouterView } from 'vue-router'
import TheNotifications from './components/TheNotifications.vue'
</script>

<template>
  <RouterView />
  <TheNotifications />
</template>
<style>
  body {
    background: radial-gradient(circle, rgba(221,255,245,1) 0%, rgba(148,187,233,1) 100%);
  }
</style>

