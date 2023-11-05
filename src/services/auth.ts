import type { UserCredentials, UserRegistrationData } from '@/interfaces'
import api from './api'

export default {
    async login(credentials: UserCredentials) {
        const response = await api.post('login', credentials);
        return response;
    },
    async register(userData: UserRegistrationData) {
      // Effettua la chiamata API per la registrazione
      // Restituisci l'utente registrato o gestisci gli errori
    },
  };
  