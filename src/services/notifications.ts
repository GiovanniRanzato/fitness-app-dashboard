import { useNotificationsStore } from '../stores/notifications'; // Importa lo store delle notifiche
import type { Notification } from '@/interfaces'


export function sendNotification(notification: Notification) {
    const notificationsStore = useNotificationsStore();
    notificationsStore.addNotification(notification);
}
