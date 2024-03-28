<script>
import { useRouter } from "vue-router";
import axios from "axios";
export default {
  data() {
    return {
      email: "",
      password: "",
      name: "",
      router: useRouter(),
      errorMsg: "",
      visible: false,
      rules: {
        required: (value) => !!value || "This field is Required.",
        min: (v) => v.length >= 6 || "Min 6 characters",
      },
      snackbar: false,
      timeout: 3000,
    };
  },
  methods: {
    AddData() {
      const userInfo = {
        email: this.email,
        password: this.password,
        name: this.name,
      };
      axios
        .post("http://192.168.1.61:3000/user/register", userInfo)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            this.router.push("/login");
          }
        })
        .catch((error) => {
          this.errorMsg = error.response.data.message;
          this.snackbar = true;
        });
    },
  },

};
</script>
<template>
  <v-container class="container">
    <v-row justify="center" class="mt-5">
      <v-col lg="4" md="5" sm="8" xs="7" xl="5" xxl="5">
        <v-form class="p-5 bg-grey-lighten-3 elevation-10   rounded" @submit.prevent="AddData">
          <h3 class=" mb-4 pa-2 d-flex justify-content-center font-weight-black">Register</h3>
          <v-text-field v-model="name" label="Enter Name" placeholder="Enter Your Name" type="text" variant="outlined"
            :rules="[() => !!name || 'This field is required', () => name.match(/^[a-zA-Z]+$/) || 'enter only alphabates']"
            class="mb-3" required>
          </v-text-field>
          <v-text-field v-model="email" label="Enter Email" placeholder="Enter Your Email address" type="email"
            variant="outlined" :rules="[() => !!email || 'This field is required']" class="mb-3" requried>
          </v-text-field>
          <v-text-field :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'" :type="visible ? 'text' : 'password'"
            placeholder="Enter your password" variant="outlined" @click:append-inner="visible = !visible"
            :rules="[rules.required, rules.min]" counter v-model="password" label="Enter Your Password"
            requried></v-text-field>
          <div class="mb-4">Alreday have an Account? <router-link to="/login" class=" font-weight-black">Sign
              in</router-link></div>
          <v-snackbar v-model="snackbar" top right color="error" :timeout="timeout">
            {{ errorMsg }}
          </v-snackbar>
          <div class="d-flex justify-content-center">
            <v-btn elevation="4" rounded="lg" size="large" color="dark" class="text-white" type="submit">Submit</v-btn>
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
