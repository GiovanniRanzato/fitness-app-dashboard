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
        if(response.status >= 300)
          throw 'Impossible creare utente'

        if (!('id' in response.data.data.attributes))
          throw 'Impossible reperire id nuovo utente'

        user = userData.fromApi(response.data.data.attributes)
        
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
        router.push({ name: 'users' })

      } catch (exception: any) {
        const message = handleException(exception)
        sendNotification({
          type: 'error',
          text: message
        })
      }
    },
    async updateUser(user: User) {
      try {
        const response = await api.patch(`users/${user.id.toString()}`, userData.toApi(user));
        if(response.status >= 300)
          throw 'Impossible aggiornare utente'

        const updatedUser = userData.fromApi(response.data.data.attributes)
                
        const index = this.users.findIndex((u) => u.id === updatedUser.id);
        if (index !== -1) {
          this.users[index] = updatedUser;
        }
        sendNotification({
          type: 'success',
          text: 'Utente aggiornato.'
        })
        router.push({ name: 'users' })
      } catch (exception: any) {
        const message = handleException(exception)
        sendNotification({
          type: 'error',
          text: message
        })
      }
    },
    async retrieveUsers(search: String = '') {
      try {
        const pageNumber = this.metadata.pageNumber
        const searchQuery = search ? `search=${search}&` : ''
        const response: RetrieveDataResponseInterface = await api.get(`users?${searchQuery}page=${pageNumber.toString()}`);
        
        this.users = response.data.data.map((element: any) => userData.fromApi(element.attributes))
        this.metadata.pageNumber = response.data.meta.current_page
        this.metadata.pageTotal = response.data.meta.last_page
        this.metadata.pageSize = response.data.meta.per_page

      } catch (exception: any) {
        const message = handleException(exception)
        sendNotification({
          type: 'error',
          text: message
        })
      }
    },
    async deleteUser(userId: Number) {
      try {
        const response = await api.delete('users/' + userId);
        console.log(response)
        if (response.status >= 300)
          throw 'Impossible cancellare utente'

        const exerciseToDelete = this.users.findIndex(user => user.id == userId)
        this.users.splice(exerciseToDelete, 1);
        
        if (this.users.length/this.metadata.pageTotal > this.metadata.pageSize) {
          this.metadata.pageNumber--;
          this.metadata.pageTotal--;
        }

        sendNotification({
          type: 'success',
          text: 'Utente eliminato.'
        })
      } catch (exception: any) {
        const message = handleException(exception)
        sendNotification({
          type: 'error',
          text: message
        })
      }
    }
  }
})