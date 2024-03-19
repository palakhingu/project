import { createRouter, createWebHistory } from "vue-router";
import Register from "../components/register.vue";
import Login from "../components/login.vue";
import home from "@/components/home.vue";
import AddTask from "@/components/AddTask.vue";
import displayTask from "../components/displayTask.vue";

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
      path: "/addTask",
      name: "addTask",
      component: AddTask,
      meta: { requiresAuth: true },
    },
    {
      path: "/displayTask",
      name: "displayTask",
      component: displayTask,
      meta: { requiresAuth: true },
    },
    {
      path: "/home",
      name: "home",
      component: home,
      meta: { requiresAuth: true },
    },
  ],
});

export default router;
