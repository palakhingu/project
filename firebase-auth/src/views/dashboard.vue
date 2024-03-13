<script>
import { useRouter } from "vue-router";
// import router from "../router/index";
export default {
  data() {
    return {
      router: useRouter(),
    };
  },
  methods: {
    logout() {
      this.$firebase
        .auth()
        .signOut()
        .then(() => {
          alert("Successfully signed out.");
          this.router.push("/");
        });
    },
  },
};
</script>
<template>
  <!-- <h2>home page</h2> -->
  <center>
    <h5>you have sign in successfully</h5>
    <button class="btn btn-dark" @click="logout">log out</button>
  </center>
</template>
