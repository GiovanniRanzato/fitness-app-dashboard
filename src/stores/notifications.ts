import { defineStore } from 'pinia'
import type { NotificationStore, Notification } from '@/interfaces'

export const useNotificationsStore = defineStore('notifications', {
  state: (): NotificationStore => ({
    notifications: []
  }),
  getters: {
    getNotifications: (state: NotificationStore) => state.notifications
  },
  actions: {
    addNotification(notification: Notification) {
        notification.timeout = setTimeout(() => {
          this.removeNotification(notification);
        }, 3000)
        this.notifications.push(notification)
      },
    
      removeNotification(notification: Notification) {
        if (notification.timeout) {
          clearTimeout(notification.timeout);
        }
        const index = this.notifications.indexOf(notification);
        if (index !== -1) {
          this.notifications.splice(index, 1);
        }
      },
  }
})
