import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import "bootstrap/dist/css/bootstrap.css";
import AuthService from "./services/AuthService";
import navbar from "./components/navbar.vue";
const app = createApp(App);
app.use(router);
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!AuthService.getUserInfo()) {
      next({
        path: "/login",
      });
    } else {
      next();
    }
  } else {
    next();
  }
});
app.mount("#app");
