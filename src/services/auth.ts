import type { UserCredentials, UserRegistrationData } from '@/interfaces'
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
  };
  