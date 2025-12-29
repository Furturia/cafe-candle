import App from "@/App.vue";
import Home from "@/views/Home.vue";
import { createMemoryHistory, createRouter, createWebHistory } from "vue-router";
import AllWishes from "@/views/AllWishes.vue";
import FormWishes from "@/views/FormWishes.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/all-wishes", component: AllWishes, name: "AllWishes" },
  { path: "/add", component: FormWishes, name: "FormWishes" },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
