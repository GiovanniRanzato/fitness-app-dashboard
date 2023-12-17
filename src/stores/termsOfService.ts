import { defineStore } from 'pinia';
import api from '../services/api'
import type { TermsOfServiceStore, RetrieveDataResponseInterface } from '@/interfaces'

export const useTermsOfServiceStore = defineStore('termsOfService', {
  state: (): TermsOfServiceStore => ({
    id: '',
    text: '',
    date: ''
  }),
  getters: {
    getTermsOfService: (state: TermsOfServiceStore) => state,
  },
  actions: {
    async retrieveLatest(){
        const response: RetrieveDataResponseInterface = await api.get(`terms-of-service/latest`);
        this.id = response.data.data.attributes.id.toString()
        this.text = response.data.data.attributes.text
        this.date = response.data.data.attributes.updated_at
    },
  }
});