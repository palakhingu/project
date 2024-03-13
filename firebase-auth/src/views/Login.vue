<script>
import { useRouter } from "vue-router";
export default {
  data() {
    return {
      email: "",
      password: "",
      router: useRouter(),
      errorMsg: "",
    };
  },
  methods: {
    login() {
      this.$firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.router.push("/dashboard");
        })
        .catch((error) => {
          console.log(error);
          if (error.code === "auth/invalid-credential") {
            this.errorMsg = "invalide credentials ";
          }
        });
    },
  },
};
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-3 col-md-1 col-sm-1"></div>
      <div class="col-lg-4 col-md-10 col-sm-12">
        <form action="" class="form-control bg-light p-5" v-on:submit.prevent="login">
          <h4 class="text-center">Login</h4>
          <br />
          <input type="email" class="form-control mb-4" placeholder="Enter Email" v-model="email" required />
          <input type="password" name="" id="" class="form-control" placeholder="Enter password" v-model="password" required />
          <br />
          <div v-if="errorMsg" class="fs-5 text-center text-danger">{{ errorMsg }}</div>
          <br />
          <div>Don't have an Account? <router-link to="/">Sign up</router-link></div>
          <button type="submit" class="btn btn-dark mt-4">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  margin: 70px auto;
}
</style>
