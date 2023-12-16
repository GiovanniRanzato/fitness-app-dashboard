import type { UserCredentials, UserRegistrationData, UpdatePassword } from '@/interfaces'
import { authData } from './authData'
import api from './api'

export default {
    async login(credentials: UserCredentials) {
        const response = await api.post('login', credentials);
        return response;
    },
    async register(userRegistrationData: UserRegistrationData) {
      const response = await api.post('register', userRegistrationData);
      return response;
    },
    async sendResetLinkEmail(email: string){
      const response = await api.post('password/email', {email: email});
      return response;
    },
    async updatePassword(resetPassword: UpdatePassword){
      const response = await api.post('password/update', authData.toApi(resetPassword));
      return response;
    },
    
  };
  