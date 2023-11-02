import { defineStore } from 'pinia'
import { computed } from 'vue'
import type { UseresStore, User } from '@/interfaces'

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
    getUserById: (state) => (userId: Number) => {
      return state.users?.find(user => user.id === userId);
    },
    getUserAttributesValuesById: (state) => (userId: Number) => computed(() => {
      const user = state.users?.find(user => user.id === userId);
      return user ? {
        id: user.id,
        email: user.email,
        name: user.name,
        lastName: user.lastName,
        phone: user.phone,
        sex: user.sex,
        birthdate: user.birthdate,
        weight: user.weight,
        height: user.height,
        address: user.address,
        city: user.city,
        zip: user.zip,
        country: user.country,
        avatar: user.avatar,
        role: user.role,
      }: null;
    }),
    getMetadata: (state: UseresStore) => state.metadata,
    getRole: () => (role: string) => role == '1' ? 'admin' : role == '2' ? 'trainer' : 'utente',
    getColor: () => (role: string) => role == '1' ? 'red' : role == '2' ? 'blue' : 'green',

  },
  actions: {
    addUser(user: User) {
      if(!this.users) this.users = []
      this.users.push(user);
      if (this.users.length/this.metadata.pageTotal > this.metadata.pageSize) {
        this.metadata.pageNumber++;
        this.metadata.pageTotal++;
      }
    },
    updateUser(user: User) {
      if(!this.users) this.users = []
      const index = this.users.findIndex((u) => u.id === user.id);
      if (index !== -1) {
        this.users[index] = user;
      }
    }
  }
})