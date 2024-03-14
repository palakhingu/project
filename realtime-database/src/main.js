import "bootstrap/dist/css/bootstrap.css";
import router from "./route/index";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { createApp } from "vue";
import App from "./App.vue";
const app = createApp(App);
const firebaseConfig = {
  apiKey: "AIzaSyC3vlSjXFo2U3SycNKnWleQFEKAj8Q6shk",
  authDomain: "fir-auth-15721.firebaseapp.com",
  projectId: "fir-auth-15721",
  storageBucket: "fir-auth-15721.appspot.com",
  messagingSenderId: "275501624741",
  appId: "1:275501624741:web:17f7705c4894313479cc4c",
};
firebase.initializeApp(firebaseConfig);

app.config.globalProperties.$firebase = firebase;
app.use(router);

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  console.log(to);
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) {
    next("/login");
  } else if (requiresAuth && currentUser) {
    next();
  } else {
    next();
  }
});

app.mount("#app");
