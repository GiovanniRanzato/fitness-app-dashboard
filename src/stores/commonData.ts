import { defineStore } from 'pinia';
import type { CommonDataStore} from '@/interfaces'

export const useCommonDataStore = defineStore('commonData', {
  state: () => ({
    genders: [
        {
            value: 'M',
            title: 'Maschio'
        },
        {
            value: 'F',
            title: 'Femmina'
        },
    ]
  }),
  getters: {
    getGenders: (state: CommonDataStore) => state.genders,
    getGenderFromValue: (state: CommonDataStore) => (value: string) => {
      return state.genders.find(el => el.value === value)
    },
  },
});
