import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
interface UserState {
  id: Number
  name: String
  lastName: String,
  avatar: String,
  isAdmin: Boolean,
  isTrainer: Boolean
}

export const useUserStore = defineStore('user', {
    state: () => {
      return {
        id: 123456,
        name: "Johon",
        lastName: 'Doe',
        avatar: "",
        isAdmin: false,
        isTrainer: true
      }
    },
    getters: {
      isLogin: (state: UserState) => state.id ?? false,
      getCompleteName: (state: any) => state.name + " " + state.lastName,
      getRole: (state: any) => state.isAdmin ? 'admin' : state.isTrainer ? 'trainer': 'user',
      getColor: (state: any) => state.isAdmin ? 'red' : state.isTrainer ? 'blue': 'white',
    }
  }
)
