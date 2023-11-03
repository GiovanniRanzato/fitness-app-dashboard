import { defineStore } from 'pinia';
import type { UiStore} from '@/interfaces'

export const useUiStore = defineStore('ui', {
  state: (): UiStore => ({
    sideNavIsOpen: false
  }),
  getters: {
    getSideNavIsOpen: (state: UiStore) => state.sideNavIsOpen,
  },
  actions: {
    toggleSideNav(){
        this.sideNavIsOpen = !this.sideNavIsOpen
    }
  }
});