import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Altri import e codice del tuo file principale


// Vuetify
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import axios from 'axios'

// Develop
axios.defaults.baseURL = 'http://127.0.0.1:8000/api/v1'

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'light',
  },
  icons: {
    defaultSet: 'mdi',
  },
  components,
  directives
})

const app = createApp(App)

app.use(createPinia())

app.use(router)
app.use(vuetify)

app.mount('#app')
