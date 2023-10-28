import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import router from '../router/index'

interface AuthState {
  userId: Number
  name: String
  email: String
  lastName: String,
  phone: String,
  sex: String,
  birthdate: String,
  weight: Number,
  height: Number,
  address: String,
  city: String,
  zip: Number,
  country: String,
  avatar: String,
  isAdmin: Boolean,
  isTrainer: Boolean
}

export const useAuthStore =defineStore('auth', {
    state: () => {
      return {
        userId:0,
        email:'',
        name:'',
        lastName:'',
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
        isAdmin: false,
        isTrainer: false
      }
    },
    getters: {
      isLogin: (state: AuthState) => state.userId ?? false,
      getCompleteName: (state: AuthState) => state.name + ' ' + state.lastName,
      getRole: (state: AuthState) => state.isAdmin ? 'admin' : state.isTrainer ? 'trainer':'user',
      getColor: (state: AuthState) => state.isAdmin ? 'red' : state.isTrainer ? 'blue':'white',
    },
    actions: {
      login(email: String, password: String) {
        console.log(email, password)
        this.userId =12345
        this.email='john@doe.com'
        this.name='John'
        this.lastName='Doe',
        this.phone='389 455 6543',
        this.sex='M'
        this.birthdate='1985-10-10',
        this.weight=86,
        this.height=178,
        this.address='Via dei limoni 12',
        this.city='Piazzola sul brenta (PD)',
        this.zip=35016,
        this.country='Italia',
        this.avatar=''
        this.isAdmin=false
        this.isTrainer=true
        router.push('/dashboard')
      },
      register(name: String, email: String, password: String) {
        console.log(name, email, password)
        this.userId =12345
        this.email='john@doe.com'
        this.name='John'
        this.lastName='Doe',
        this.phone='389 455 6543',
        this.sex='M'
        this.birthdate='1986-10-11',
        this.weight=86,
        this.height=178,
        this.address='Via dei limoni 12',
        this.city='Piazzola sul brenta (PD)',
        this.zip=35016,
        this.country='Italia',
        this.avatar=''
        this.isAdmin=true
        this.isTrainer=false
        router.push('/dashboard')
      },
      logout(){
        console.log('logout')
        this.userId =0
        this.email=''
        this.name=''
        this.lastName='',
        this.phone='',
        this.sex=''
        this.birthdate='',
        this.weight=0,
        this.height=0,
        this.address='',
        this.city='',
        this.zip=0,
        this.country='',
        this.avatar=''
        this.isAdmin=false
        this.isTrainer=false
        router.push('/')
      }
    }
  }
)
