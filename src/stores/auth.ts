import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import router from '../router/index'
import type { User} from '@/interfaces'
import { sendNotification } from '@/services/notifications'

export const useAuthStore =defineStore('auth', {
    state: () => {
      return {
        id:0,
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
        role:'0'
      }
    },
    getters: {
      isLogin: (state: User) => state.id ?? false,
      getCompleteName: (state: User) => state.name + ' ' + state.lastName,
      getRole: (state: User) => state.role == '1' ? 'admin' : state.role == '2' ? 'trainer':'user',
      getColor: (state: User) => state.role == '1' ? 'red' : state.role == '2' ? 'blue':'white',
      getAttributesValues(state: User) {
        return {
          id: state.id,
          email: state.email,
          name: state.name,
          lastName: state.lastName,
          phone: state.phone,
          sex: state.sex,
          birthdate: state.birthdate,
          weight: state.weight,
          height: state.height,
          address: state.address,
          city: state.city,
          zip: state.zip,
          country: state.country,
          avatar: state.avatar,
          role: state.role,
        };
      },
    },
    actions: {
      login(email: String, password: String) {
        console.log(email, password)
        this.id =12345
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
        this.id =12345
        this.email='john@doe.com'
        this.name='John'
        this.role='1'
        router.push('/dashboard')
      },
      logout(){
        console.log('logout')
        this.id =0
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
      },
      update(user: User){
        this.name=user.name
        this.lastName=user.lastName
        this.phone=user.phone
        this.sex=user.sex
        this.birthdate=user.birthdate
        this.weight=user.weight
        this.height=user.height
        this.address=user.address
        this.city=user.city
        this.zip=user.zip
        this.country=user.country
        this.avatar=user.avatar
        sendNotification({
          type: 'success',
          text: 'Profilo utente aggiornato.'
        })
      }
    }
  }
)
