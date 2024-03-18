<script>
import { useRouter } from "vue-router";
import axios from "axios";
export default {
  data() {
    return {
      email: "",
      password: "",
      router: useRouter(),
      errorMsg: "",
      user: null,
    };
  },
  methods: {
    // login() {
    //   const userInfo = {
    //     email: this.email,
    //     password: this.password,
    //   };
    //   axios
    //     .post("http://192.168.1.61:3000/user/login", userInfo)
    //     .then((response) => {
    //       console.log(response);
    //       console.log(response.data);
    //       this.email = "";
    //       this.password = "";
    //       if (response.status == 200) {
    //         // this.errorMsg = response.data.message;
    //         this.router.push("/home");
    //       }
    //     })
    //     .catch((error) => {
    //       console.error(error.response.data.message);
    //       this.errorMsg = error.response.data.message;
    //     });
    // },
    async login() {
      const userInfo = {
        email: this.email,
        password: this.password,
      };
      try {
        const response = await axios.post("http://192.168.1.61:3000/user/login", userInfo);
        const token = response.data.token;
        const id = response.data.data.id;
        localStorage.setItem("token", token);
        const userResponse = await axios.get(`http://192.168.1.61:3000/user/get/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const user = userResponse.data;
        // if (response.status == 200) {
        //   this.router.push("/home");
        // }
      } catch (error) {
        console.error("Login failed:", error);
      }
    },
  },
};
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-4 col-md-1 col-sm-1"></div>
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
