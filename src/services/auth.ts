import type { UserCredentials, UserRegistrationData, UpdatePassword } from '@/interfaces'
import { updatePasswordData } from './authData'
import { userRegistrationData } from './authData'
import api from './api'

export default {
    async login(credentials: UserCredentials) {
        const response = await api.post('login', credentials);
        return response;
    },
    async register(userRegistration: UserRegistrationData) {
      const response = await api.post('register', userRegistrationData.toApi(userRegistration));
      return response;
    },
    async sendResetLinkEmail(email: string){
      const response = await api.post('password/email', {email: email});
      return response;
    },
    async updatePassword(updatePassword: UpdatePassword){
      const response = await api.post('password/update', updatePasswordData.toApi(updatePassword));
      return response;
    },
    
  };
  