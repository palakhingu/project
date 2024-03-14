<script>
// import { auth } from "../main";
import { useRouter } from "vue-router";
import axios from "axios";
export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
        name: "",
        dob: "",
        cPassword: "",
        number: "",
      },
      router: useRouter(),
      errorMsg: "",
    };
  },
  methods: {
    AddData() {
      axios.post(`https://fir-auth-15721-default-rtdb.firebaseio.com/user.json`, this.user).then((response) => {
        console.log(response);
        alert("added");
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
      <div class="col-lg-3 col-md-1 col-sm-1"></div>
      <div class="col-lg-5 col-md-10 col-sm-12">
        <form action="" class="form-control bg-light p-5" @:submit.prevent="AddData">
          <h4 class="text-center">Register</h4>
          <br />
          <input type="text" class="form-control mb-4" placeholder="Enter Name" v-model="user.name" required />
          <input type="email" class="form-control mb-4" placeholder="Enter Email" v-model="user.email" required />
          <label for="" class="">Enter Date Of Birth</label><br />
          <input type="date" class="form-control mb-4" v-model="user.dob" required max="2024-03-12" />
          <input type="number" name="" id="" class="form-control mb-4" placeholder="Enter Phone Number" v-model="user.number" required />
          <input type="password" name="" id="" class="form-control mb-4" placeholder="Enter password" v-model="user.password" required />
          <input type="password" name="" id="" class="form-control mb-4" placeholder="Confirm Password" v-model="user.cPassword" required />

          <div v-if="errorMsg" class="fs-5 text-danger text-center">{{ errorMsg }}</div>
          <br />
          <div>Alreday have an Account? <router-link to="/login">Sign in</router-link></div>
          <center>
            <button type="submit" class="btn btn-dark mt-4">Submit</button>
          </center>
          <hr />
          <h5 class="text-center">or</h5>
          <center>
            <!-- <button @click="googleSignIn" class="btn btn-dark">Sign up with Google</button> -->
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

