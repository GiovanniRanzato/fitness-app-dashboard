import { defineStore } from 'pinia'
import type { UseresStore} from '@/interfaces'

export const useUsersStore = defineStore('users', {
    state: () => {
      return {
        users: null,
        metadata: null
      }
    },
    getters: {
      getUsers: (state: UseresStore) => [{
        userId:1222,
        email:'email@example.it',
        name:'Harry',
        lastName:'Potter',
        phone:'',
        sex:'',
        birthdate:'',
        weight:0,
        height:0,
        address:'',
        city:'',
        zip:0,
        country:'',
        avatar:'',
        role:'0'
      },
      {
        userId:1222,
        email:'severus@piton.it',
        name:'Severus',
        lastName:'Piton',
        phone:'',
        sex:'',
        birthdate:'',
        weight:0,
        height:0,
        address:'',
        city:'',
        zip:0,
        country:'',
        avatar:'',
        role:'1'
      },
      {
        userId:34322,
        email:'magic@mike.it',
        name:'Magick',
        lastName:'Mike',
        phone:'',
        sex:'',
        birthdate:'',
        weight:0,
        height:0,
        address:'',
        city:'',
        zip:0,
        country:'',
        avatar:'',
        role:'2'
      }
    ],
      getRole: () => (role: string) => role == '1' ? 'admin' : role == '2' ? 'trainer':'utente',
      getColor: () => (role: string) =>role == '1' ? 'red' : role == '2' ? 'blue':'green',
    },

  }
)