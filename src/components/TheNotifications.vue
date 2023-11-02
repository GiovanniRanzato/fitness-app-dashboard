<script setup lang="ts">
import { computed } from "vue"
import { useNotificationsStore } from "../stores/notifications"

import type { Notification } from '@/interfaces'

const notificationsStore = useNotificationsStore()

const notifications = computed(() => notificationsStore.getNotifications)

const removeNotification = (notification: Notification) =>{ 
    notificationsStore.removeNotification(notification)
}

</script>
<template>
      <v-snackbar
        v-for="(notification, i) in notifications" :key="'notification_'+i"
        :model-value="true"
        location="bottom right"
        multiline>{{ notification.text }}
        
        <template v-slot:actions>
          <v-btn
            :color="notification.type"
            variant="text"
            @click="removeNotification(notification)"
          >Close
          </v-btn>
        </template>
      </v-snackbar>
  </template>