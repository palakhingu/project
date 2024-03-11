import { createApp } from "vue";
import "bootstrap/dist/css/bootstrap.css";
import Register from "./components/Register.vue";
import router from "./Router/index";

import App from "./App.vue";
const app = createApp(App);
app.use(router);
app.component("Register", Register);
app.mount("#app");
