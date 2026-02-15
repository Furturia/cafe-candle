import './assets/main.css'

import { createApp } from 'vue'
import axios from 'axios'
import App from './App.vue'
import { router } from '../router'

// Configure axios defaults
axios.defaults.baseURL = 'http://localhost:3000/api'

const app = createApp(App)
app.config.globalProperties.$axios = axios
app.use(router)
app.mount('#app')
