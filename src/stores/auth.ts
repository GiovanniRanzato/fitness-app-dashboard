import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import router from '../router/index'

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
        role:''
      }
    },
    getters: {
      isLogin: (state: AuthStore) => state.userId ?? false,
      getCompleteName: (state: AuthStore) => state.name + ' ' + state.lastName,
      getRole: (state: AuthStore) => state.role == '1' ? 'admin' : state.role == '2' ? 'trainer':'',
      getColor: (state: AuthStore) => state.role == '1' ? 'red' : state.role == '2' ? 'blue':'',
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
        this.role='2'
        router.push('/dashboard')
      },
      register(name: String, email: String, password: String) {
        console.log(name, email, password)
        this.userId =12345
        this.email='john@doe.com'
        this.name='John'
        this.role='1'
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
        this.role=''
        router.push('/')
      }
    }
  }
)
