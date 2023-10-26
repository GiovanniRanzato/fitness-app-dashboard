import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import router from '../router/index'

interface AuthState {
  userId: Number
  name: String
  email: String
  lastName: String,
  avatar: String,
  isAdmin: Boolean,
  isTrainer: Boolean
}

export const useAuthStore = defineStore('auth', {
    state: () => {
      return {
        userId: 0,
        email: "",
        name: "",
        lastName: "",
        avatar: "",
        isAdmin: false,
        isTrainer: false
      }
    },
    getters: {
      isLogin: (state: AuthState) => state.userId ?? false,
      getCompleteName: (state: any) => state.name + " " + state.lastName,
      getRole: (state: any) => state.isAdmin ? 'admin' : state.isTrainer ? 'trainer': 'user',
      getColor: (state: any) => state.isAdmin ? 'red' : state.isTrainer ? 'blue': 'white',
    },
    actions: {
      login(email: String, password: String) {
        console.log(email, password)
        this.userId = 12345
        this.email= "jhon@doe.com"
        this.name= "Johon"
        this.lastName= 'Doe'
        this.avatar= ""
        this.isAdmin= false
        this.isTrainer= true
        router.push('/dashboard')
      },
      register(name: String, email: String, password: String) {
        console.log(name, email, password)
        this.userId = 12345
        this.email= "mike@stoneson.com"
        this.name= "Mike"
        this.lastName= 'Stoneson'
        this.avatar= ""
        this.isAdmin= true
        this.isTrainer= false
        router.push('/dashboard')
      },
      logout(){
        console.log('logout')
        this.userId = 0
        this.email= ""
        this.name= ""
        this.lastName= ''
        this.avatar= ""
        this.isAdmin= false
        this.isTrainer= false
        router.push('/')
      }
    }
  }
)
