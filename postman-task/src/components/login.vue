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
      visible: false,
      rules: {
        required: (value) => !!value || "This field is Required.",
        min: (v) => v.length >= 6 || "Min 6 characters",
      },
      snackbar: false,
      timeout: 2000,
    };
  },
  methods: {
    login() {
      const token = localStorage.getItem("token");
      if (token) {
        this.errorMsg = "you have already logged in";
        this.snackbar = true;
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
            this.snackbar = true;
          });
      }
    },
  },
};
</script>

<template>
  <v-container class="container">
    <v-row justify="center" class="mt-5">
      <v-col lg="5">
        <v-form class="p-5 bg-grey-lighten-3 elevation-10 rounded" @submit.prevent="login">
          <h3 class="mb-4 pa-2 d-flex justify-content-center font-weight-black">Login</h3>
          <v-text-field v-model="email" label="Enater Email" placeholder="Enter Your Email address" type="email"
            variant="outlined" :rules="[() => !!email || 'This field is required']" class="mb-3">
          </v-text-field required>
          <v-text-field :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'" :type="visible ? 'text' : 'password'"
            placeholder="Enter your password" variant="outlined" @click:append-inner="visible = !visible"
            :rules="[rules.required]" counter v-model="password" label="Enter Your Password" required></v-text-field>
          <div class="mb-4">Dont't Have An Account? <router-link to="/" class="font-weight-black">Sign up</router-link>
          </div>
          <v-snackbar v-model="snackbar" top right color="error" :timeout="timeout">
            {{ errorMsg }}
          </v-snackbar>
          <div class="d-flex justify-content-center">
            <v-btn elevation="4" rounded="lg" size="x-large" color="dark" class="text-white"
              type="submit">Submit</v-btn>
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
