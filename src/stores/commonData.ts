import { defineStore } from 'pinia';

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
    ],
  }),

  getters: {
    getGenders: (state: CommonDataStore) => state.genders,
  },
});
