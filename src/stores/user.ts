import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('counter', () => {
  const userId = ref(0)
  const getUserId = computed(() => userId.value) // This is for example
  function isLogin() {
    return userId.value ?? false
  } // This is for example

  return { userId, getUserId, isLogin }
})
