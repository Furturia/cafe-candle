import App from '@/App.vue'
import Home from '@/views/Home.vue'
import { createMemoryHistory, createRouter } from 'vue-router'

const routes = [
  { path: '/', component: Home }
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})