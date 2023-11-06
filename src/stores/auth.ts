import { defineStore } from 'pinia'
import router from '../router/index'
import type { User } from '@/interfaces'
import { sendNotification } from '@/services/notifications'
import authService from '../services/auth'
import { handleException } from '../services/exceptionsHandler'

import type { AuthStore, UserCredentials, UserRegistrationData } from '@/interfaces'

const EMPTY_USER = {
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
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthStore => {
    return {
      user: EMPTY_USER,
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
    }
  },
  actions: {
    async login(credentials: UserCredentials) {
      try {
        const response = await authService.login(credentials);
        if (response.status >= 300)
          throw 'login error'
        
        if (!('token' in response) || typeof response.token !== 'string')
          throw 'impossible to get token from server response'

        this.user = {...this.user, ...response.data.attributes}
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
    async register(userRegistrationData: UserRegistrationData) {
      try {
        const response = await authService.register(userRegistrationData);
        if (response.status >= 300)
          throw 'register error'
        
        if (!('token' in response) || typeof response.token !== 'string')
          throw 'impossible to get token from server response'
        
        this.user = {...this.user, ...response.data.attributes}
        this.token = response.token
      
      router.push('/dashboard')
      } catch (exception: any) {
        const message = handleException(exception)
        sendNotification({
          type: 'error',
          text: message
        })
      }
    },
    logout() {
      console.log('logout')
      this.user = EMPTY_USER
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
