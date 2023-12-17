import { defineStore } from 'pinia'
import router from '../router/index'
import type { User } from '@/interfaces'
import { sendNotification } from '@/services/notifications'
import authService from '../services/auth'
import api from '../services/api'
import { userData } from '../services/userData'
import { userRegistrationData } from '../services/authData'

import { handleException } from '../services/exceptionsHandler'

import type { AuthStore, UserCredentials, UserRegistrationData, UpdatePassword } from '@/interfaces'

export const useAuthStore = defineStore('auth', {
  state: (): AuthStore => {
    return {
      user: userData.emptyUser(),
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
      return { ...state.user }
    },
    canCreateUsers: (state: AuthStore) => state.user.role == '1' ? true : false,
    canUpdateUsers: (state: AuthStore) => state.user.role == '1' ? true : false,
    canDeleteUsers: (state: AuthStore) => state.user.role == '1' ? true : false,
    canCreateCards: (state: AuthStore) => state.user.role == '1' || state.user.role == '2'  ? true : false,
    canUpdateCards: (state: AuthStore) => state.user.role == '1' || state.user.role == '2'? true : false,
    canDeleteCards: (state: AuthStore) => state.user.role == '1' || state.user.role == '2'? true : false,
    canCreateCardDetails: (state: AuthStore) => state.user.role == '1' || state.user.role == '2'  ? true : false,
    canUpdateCardDetails: (state: AuthStore) => state.user.role == '1' || state.user.role == '2'? true : false,
    canDeleteCardDetails: (state: AuthStore) => state.user.role == '1' || state.user.role == '2'? true : false,
    canCreateExercises: (state: AuthStore) => state.user.role == '1' || state.user.role == '2'  ? true : false,
    canUpdateExercises: (state: AuthStore) => state.user.role == '1' || state.user.role == '2'? true : false,
    canDeleteExercises: (state: AuthStore) => state.user.role == '1' || state.user.role == '2'? true : false
  },
  actions: {
    async login(credentials: UserCredentials) {
      try {
        const response = await authService.login(credentials);
        if (response.status >= 300)
          throw 'login error'

        if (!('token' in response.data) || typeof response.data.token !== 'string')
          throw 'impossible to get token from server response'

        this.user = userData.fromApi(response.data.data.attributes)

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
    async register(userRegistration: UserRegistrationData) {
      try {
        const response = await authService.register(userRegistrationData.toApi(userRegistration));
        if (response.status >= 300)
          throw 'register error'

        if (!('token' in response.data) || typeof response.data.token !== 'string')
          throw 'impossible to get token from server response'

        this.user = userData.fromApi(response.data.data.attributes)
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
    async update(user: User) {
      try {
        const response = await api.patch('users/' + this.user.id, userData.toApi(user));
        if (response.status >= 300)
          throw 'update user error'

        this.user = { ...this.user, ...user }

        sendNotification({
          type: 'success',
          text: 'Profilo utente aggiornato.'
        })
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
      this.user = userData.emptyUser()
      this.token = ''
      router.push('/')
    },
    async sendResetLinkEmail(email: string) {
      try {
        const response = await authService.sendResetLinkEmail(email);
        if (response.status >= 300)
          throw 'Si è verificato un errore. Riprova più tardi..'
        
          sendNotification({
          type: 'success',
          text: 'Abbiamo inviato una mail con il link per resettare la password.'
        })
  
      } catch (exception: any) {
        const message = handleException(exception)
        sendNotification({
          type: 'error',
          text: 'Errore durante l\'invio del link di reset. Controlla l\'email inserita o prova più tardi.'
        })
      }

    },
    async updatePassword(updatePassword: UpdatePassword) {
      try {
        const response = await authService.updatePassword(updatePassword);
        if (response.status >= 300)
          throw 'Si è verificato un errore. Riprova più tardi..'
        
          sendNotification({
          type: 'success',
          text: 'La password è stata cambiata.'
        })
  
      } catch (exception: any) {
        const message = handleException(exception)
        sendNotification({
          type: 'error',
          text: 'Errore durante il reset della password. Controlla l\'email inserita o prova più tardi.'
        })
      }

    },
  }
}
)
