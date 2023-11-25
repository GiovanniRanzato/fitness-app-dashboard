import { defineStore } from 'pinia';
import type { UiStore, NavItem, UserRole} from '@/interfaces'

export const useUiStore = defineStore('ui', {
  state: (): UiStore => ({
    sideNavIsOpen: true,
    pageTitle: '',
    navItems: [
      {
          icon: "mdi-account-multiple",
          key: "users",
          route: "/dashboard/users",
          label: "Utenti",
          allowed: ["1", "2"]
      },
      {
          icon: "mdi-cards",
          key: "cards",
          route: "/dashboard/cards",
          label: "Schede",
          allowed: ["0", "1", "2"]
      },
      {
          icon: "mdi-run",
          key: "exercises",
          route: "/dashboard/exercises",
          label: "Esercizi",
          allowed: ["1", "2"]
      },
    ],
    onSearch: undefined
  }),
  getters: {
    getSideNavIsOpen: (state: UiStore) => state.sideNavIsOpen,
    getPageTitle: (state: UiStore) => state.pageTitle,
    getNavItemsByUserRole: (state: UiStore) => (role: UserRole) => {
      return state.navItems.filter(item => item.allowed.includes(role));
    },
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