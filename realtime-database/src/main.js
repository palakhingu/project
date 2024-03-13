import "bootstrap/dist/css/bootstrap.css";
import router from "./route/index";

import { createApp } from "vue";
import App from "./App.vue";
const app = createApp(App);
app.use(router);
app.mount("#app");
