import { defineStore } from 'pinia';
interface SelectItem {
    value: String,
    title: String
}
interface CommonDataStore {
    genders: SelectItem[]
}

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
