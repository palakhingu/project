<script>
import { useRouter } from "vue-router";
import AuthService from "@/services/AuthService";
export default {
  data() {
    return {
      email: "",
      password: "",
      router: useRouter(),
      errorMsg: "",
      show1: false,
      show2: true
    };
  },
  methods: {
    login() {
      const token = localStorage.getItem("token");
      if (token) {
        this.errorMsg = "you have already logged in";
        return;
      } else {
        AuthService.login({ email: this.email, password: this.password })
          .then((response) => {
            const token = response.data.token;
            const user = response.data.data;
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", token);
            this.router.push("/addTask");
          })
          .catch((error) => {
            this.errorMsg = error.response.data.message;
          });
      }
    },
  },
};
</script>

<template>
  <!-- <div class="container">
    <div class="row">
      <div class="col-lg-4 col-md-1 col-sm-1"></div>
      <div class="col-lg-4 col-md-10 col-sm-12">
        <form class="form-control bg-light p-5" v-on:submit.prevent="login">
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
  </div> -->


  <v-container class="container">
    <v-row justify="center" class="mt-5">
      <v-col lg="5">
        <v-form class="p-5 bg-grey-lighten-3 elevation-10 rounded" @submit.prevent="login">
          <h3 class=" mb-4 pa-2 d-flex justify-content-center font-weight-black">Login</h3>

          <v-text-field 
            v-model="email" 
            label="Enater Email"
            placeholder="Enter Your Email address" 
            type="email"
            variant="outlined"
            :rules="[() => !!email || 'This field is required']"
            class="mb-3">
          </v-text-field>
          <v-text-field
            v-model="password"
            :append-inner-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[() => !!password || 'This field is required', () => password.length>=6  || 'min 6 characters']"
            label="Enter Your Password"
            counter
            variant="outlined"
            placeholder="Enter Your Password"
            @click:append="show1 = !show1"
          ></v-text-field>  '
            <div class="mb-4">Dont't Have An Account? <router-link to="/" class=" font-weight-black">Sign up</router-link></div>
          <div class="d-flex justify-content-center">
            <v-btn elevation="4" rounded="lg" size="x-large" color="dark" class="text-white" type="submit">Submit</v-btn>
          </div>

        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>















<style scoped>
.container {
  margin: 70px auto;
}
</style>