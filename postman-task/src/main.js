import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index";
import "bootstrap/dist/css/bootstrap.css";
import AuthService from "./services/AuthService";
import PrimeVue from "primevue/config";
import MultiSelect from "primevue/multiselect";
import "primevue/resources/primevue.min.css";
import "primevue/resources/themes/saga-blue/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import '@mdi/font/css/materialdesignicons.css'
// import '@fortawesome/fontawesome-free/css/all.css'

const vuetify = createVuetify({
  components,
  directives,
});
const app = createApp(App);
app.use(router);
app.use(PrimeVue);
app.use(vuetify);

app.component("MultiSelect", MultiSelect);
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
