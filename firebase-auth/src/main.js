import "bootstrap/dist/css/bootstrap.css";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const firebaseConfig = {
  apiKey: "AIzaSyC3vlSjXFo2U3SycNKnWleQFEKAj8Q6shk",
  authDomain: "fir-auth-15721.firebaseapp.com",
  projectId: "fir-auth-15721",
  storageBucket: "fir-auth-15721.appspot.com",
  messagingSenderId: "275501624741",
  appId: "1:275501624741:web:17f7705c4894313479cc4c",
};
firebase.initializeApp(firebaseConfig);

const app = createApp(App);

app.use(router);
app.config.globalProperties.$firebase = firebase;

app.mount("#app");

// import Vue from 'vue'
// import App from './App.vue'
// import firebase from 'firebase/app'
// import 'firebase/auth'
// import 'firebase/firestore'

// Vue.config.productionTip = false

// // Initialize Firebase
// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_AUTH_DOMAIN",
//   projectId: "YOUR_PROJECT_ID",
//   storageBucket: "YOUR_STORAGE_BUCKET",
//   messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//   appId: "YOUR_APP_ID"
// };

// firebase.initializeApp(firebaseConfig);

// Vue.prototype.$firebase = firebase;

// new Vue({
//   render: h => h(App),
// }).$mount('#app')
