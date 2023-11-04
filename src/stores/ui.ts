import { defineStore } from 'pinia';
import type { UiStore} from '@/interfaces'

export const useUiStore = defineStore('ui', {
  state: (): UiStore => ({
    sideNavIsOpen: true,
    pageTitle: ''
  }),
  getters: {
    getSideNavIsOpen: (state: UiStore) => state.sideNavIsOpen,
    getPageTitle: (state: UiStore) => state.pageTitle,
  },
  actions: {
    toggleSideNav(){
        this.sideNavIsOpen = !this.sideNavIsOpen
    },
    setPageTitle(pageTitle: string){
        this.pageTitle = pageTitle
    }
  }
});