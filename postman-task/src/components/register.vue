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
      postData: [],
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
          console.log(response.data.data);
          this.email = "";
          this.password = "";
          this.name = "";
          if (response.status === 200) {
            this.router.push("/login");
          }
        })
        .catch((error) => {
          this.errorMsg = error.response.data.message;
        });
    },
  },

  watch: {
    name(val) {
      if (!val.match(/^[a-zA-Z]+$/)) {
        this.errorMsg = "please enter only alphabates";
      } else {
        this.errorMsg = "";
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
        <form action="" class="form-control bg-light p-5" @:submit.prevent="AddData">
          <h4 class="text-center">Register</h4>
          <br />
          <input type="text" class="form-control mb-4 text-center" placeholder="Enter Name" v-model="name" required />
          <input type="email" class="form-control mb-4 text-center" placeholder="Enter Email" v-model="email" required />
          <input type="password" name="" id="" class="form-control mb-4 text-center" placeholder="Enter password" v-model="password" required />

          <div v-if="errorMsg" class="fs-5 text-danger text-center">{{ errorMsg }}</div>
          <br />
          <div>Alreday have an Account? <router-link to="/login">Sign in</router-link></div>
          <center>
            <button type="submit" class="btn btn-dark mt-4">Submit</button>
          </center>
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
