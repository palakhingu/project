import { createRouter, createWebHistory } from "vue-router";
import Register from "../components/register.vue";
import Login from "../components/login.vue";
import AddTask from "@/components/AddTask.vue";
import displayTask from "../components/displayTask.vue";
import demo from "@/components/demo.vue";

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
      path: "/demo",
      name: "demo",
      component: demo,
    },
    {
      path: "/addTask",
      name: "addTaskNoId",
      component: AddTask,
      // meta: { requiresAuth: true },
    },
    {
      path: "/addTask/:id",
      name: "addTaskWithId",
      component: AddTask,
    },
    {
      path: "/displayTask",
      name: "displayTask",
      component: displayTask,
      meta: { requiresAuth: true },
    },
  ],
});

export default router;
