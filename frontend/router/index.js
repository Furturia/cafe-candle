import Home from "@/views/Home.vue";
import { createRouter, createWebHistory } from "vue-router";
import AllWishes from "@/views/AllWishes.vue";
import FormWishes from "@/views/FormWishes.vue";
import FormPage from "@/views/FormPage.vue";
import Success from "@/views/Success.vue";

const routes = [
  { path: "/", component: Home, name: 'home' },
  { path: "/all-wishes", component: AllWishes, name: "AllWishes" },
  { path: "/add", component: FormWishes, name: "FormWishes" },
  { path: "/form", component: FormPage, name: "FormPage" },
  { path: "/success/:id", component: Success, name: "Success" },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
