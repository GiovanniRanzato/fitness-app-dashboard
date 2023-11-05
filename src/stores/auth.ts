import { defineStore } from 'pinia'
import router from '../router/index'
import type { User } from '@/interfaces'
import { sendNotification } from '@/services/notifications'
import authService from '../services/auth'
import { handleException } from '../services/exceptionsHandler'

import type { AuthStore, UserCredentials, UserRegistrationData } from '@/interfaces'
import type { AxiosError } from 'axios'

export const useAuthStore = defineStore('auth', {
  state: (): AuthStore => {
    return {
      user: {
        id: 0,
        email: '',
        name: '',
        lastName: '',
        phone: '',
        sex: '',
        birthdate: '',
        weight: 0,
        height: 0,
        address: '',
        city: '',
        zip: 0,
        country: '',
        avatar: '',
        role: '0'
      },
      token: ''
    }
  },
  getters: {
    isLogin: (state: AuthStore) => state.user.id && state.token ? true : false,
    getCompleteName: (state: AuthStore) => {
      const name = state.user.name ?? '??'
      const lastName = state.user.lastName ?? ''
      return name + ' ' + lastName

    },
    getRole: (state: AuthStore) => state.user.role == '1' ? 'admin' : state.user.role == '2' ? 'trainer' : 'user',
    getColor: (state: AuthStore) => state.user.role == '1' ? 'red' : state.user.role == '2' ? 'blue' : 'green',
    getAttributesValues(state: AuthStore) {
      return JSON.parse(JSON.stringify(state.user))
    },
  },
  actions: {
    async login(credentials: UserCredentials) {
      try {
        const response = await authService.login(credentials);
        this.user = response.data.attributes
        this.token = response.data.token
        router.push('/dashboard')
      } catch (exception: any) {
        const message = handleException(exception)
        sendNotification({
          type: 'error',
          text: message
        })
      }

    },
    register(name: String, email: String, password: String) {
      console.log(name, email, password)
      this.user.id = 12345
      this.user.email = 'john@doe.com'
      this.user.name = 'John'
      this.user.role = '1'
      router.push('/dashboard')
    },
    logout() {
      console.log('logout')
      this.user.id = 0
      this.user.email = ''
      this.user.name = ''
      this.user.lastName = '',
      this.user.phone = '',
      this.user.sex = ''
      this.user.birthdate = '',
      this.user.weight = 0,
      this.user.height = 0,
      this.user.address = '',
      this.user.city = '',
      this.user.zip = 0,
      this.user.country = '',
      this.user.avatar = ''
      this.user.role = ''
      router.push('/')
    },
    update(user: User) {
      this.user.name = user.name
      this.user.lastName = user.lastName
      this.user.phone = user.phone
      this.user.sex = user.sex
      this.user.birthdate = user.birthdate
      this.user.weight = user.weight
      this.user.height = user.height
      this.user.address = user.address
      this.user.city = user.city
      this.user.zip = user.zip
      this.user.country = user.country
      this.user.avatar = user.avatar
      sendNotification({
        type: 'success',
        text: 'Profilo utente aggiornato.'
      })
    }
  }
}
)
