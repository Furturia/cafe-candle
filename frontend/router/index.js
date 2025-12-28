import App from '@/App.vue'
import Home from '@/views/Home.vue'
import { createMemoryHistory, createRouter } from 'vue-router'
import AllWishes from '@/views/AllWishes.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/all-wishes', component: AllWishes, name: 'AllWishes' },
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})