import { createRouter, createWebHistory } from "vue-router";
import Register from "../components/register.vue";
import Login from "../components/login.vue";
import home from "@/components/home.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Register",
      component: Register,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/home",
      name: "home",
      component: home,
    },
  ],
});

export default router;
