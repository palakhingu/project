import { createRouter, createWebHistory } from "vue-router";
import Register from "../components/Register.vue";
import Login from "../components/Login.vue";
import dashboard from "../components/dashboard.vue";
import Edit from "@/components/Edit.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Register",
      component: Register,
      props: true,
    },
    {
      path: "/edit/:id",
      name: "Edit",
      component: Edit,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: dashboard,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

export default router;
