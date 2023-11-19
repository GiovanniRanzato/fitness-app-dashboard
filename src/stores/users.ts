import { defineStore } from 'pinia'
import { computed } from 'vue'
import router from '../router/index'
import type { UseresStore, User, RetrieveDataResponseInterface } from '@/interfaces'
import { sendNotification } from '@/services/notifications'
import api from '@/services/api'
import { userData } from '@/services/userData'
import { handleException } from '../services/exceptionsHandler'

export const useUsersStore = defineStore('users', {
  state: (): UseresStore => {
    return {
      users: [],
      metadata: {
        pageNumber: 1,
        pageSize: 5,
        pageTotal: 1
      }
    }
  },
  getters: {
    getUsers: (state: UseresStore) => state.users,
    getUsersForCurrentPage: (state: UseresStore) => {
      const users = state.users ?? [];
      const startIndex = (state.metadata.pageNumber - 1) * state.metadata.pageSize;
      const endIndex = startIndex + state.metadata.pageSize;
      return users.slice(startIndex, endIndex);
    },
    getUserAttributesValuesById: (state) => (userId: Number) => computed(() => {
      const user = state.users?.find(user => user.id === userId);
      return user ? { ...user }: null;
    }),
    getMetadata: (state: UseresStore) => state.metadata,
    getRole: () => (role: string) => role == '1' ? 'admin' : role == '2' ? 'trainer' : 'utente',
    getColor: () => (role: string) => role == '1' ? 'red' : role == '2' ? 'blue' : 'green',

  },
  actions: {
    async addUser(user: User) {
      try {
        const response = await api.post('users/', userData.toApi(user));

        if (!('id' in response.data.attributes))
          throw 'impossible to get new user id from server response'

        user = userData.fromApi(response.data.attributes)
        
        if(!this.users) this.users = []
        
        this.users.push(user);
        
        if (this.users.length/this.metadata.pageTotal > this.metadata.pageSize) {
          this.metadata.pageNumber++;
          this.metadata.pageTotal++;
        }

        sendNotification({
          type: 'success',
          text: 'Utente creato.'
        })

        router.push({ name: 'users-edit', params: { id: user.id } })

      } catch (exception: any) {
        const message = handleException(exception)
        sendNotification({
          type: 'error',
          text: message
        })
      }
    },
    updateUser(user: User) {
      if(!this.users) this.users = []
      const index = this.users.findIndex((u) => u.id === user.id);
      if (index !== -1) {
        this.users[index] = user;
      }
      sendNotification({
        type: 'success',
        text: 'Utente aggiornato.'
      })
    },
    async retrieveUsers() {
      try {
        const response: RetrieveDataResponseInterface = await api.get('users/');
        this.users = response.data.map((element: any) => userData.fromApi(element.attributes))
        this.metadata.pageNumber = response.meta.current_page
        this.metadata.pageTotal = response.meta.last_page

      } catch (exception: any) {
        const message = handleException(exception)
        sendNotification({
          type: 'error',
          text: message
        })
      }
    },
    deleteUser(userId: Number) {
      const index = this.users.findIndex((u) => u.id === userId);
      if (index !== -1) {
        this.users.splice(index, 1);
      }
    }
  }
})