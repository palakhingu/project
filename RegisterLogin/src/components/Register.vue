<script>
import { useRouter } from "vue-router";
export default {
  data() {
    return {
      name: "",
      email: "",
      dob: "",
      number: "",
      password: "",
      cPassword: "",
      errorMsg: "",
      router: useRouter(),
      flag: true,
    };
  },
  methods: {
    getData() {
      let arr = JSON.parse(localStorage.getItem("userInfo"));
      return arr;
    },
    setData(arr) {
      localStorage.setItem("userInfo", JSON.stringify(arr));
    },
    add() {
      if (this.flag) {
        let arr = this.getData();

        if (arr === null) {
          if (this.password !== this.cPassword) {
            this.errorMsg = "Password does not match";
            return;
          } else if (!/^\d{10}$/.test(this.number)) {
            this.errorMsg = "please enter 10 digit number";
            return;
          } else {
            const obj = {
              name: this.name,
              email: this.email,
              dob: this.dob,
              number: this.number,
              password: this.password,
            };
            let data = [obj];
            this.setData(data);
            this.router.push({ path: "/login" });
          }
        } else {
          if (arr.some((user) => user.email === this.email)) {
            this.errorMsg = "Email already exists";
            return;
          } else if (this.password !== this.cPassword) {
            this.errorMsg = "Password does not match ";
            return;
          } else if (!/^\d{10}$/.test(this.number)) {
            this.errorMsg = "please enter 10 digit number";
            return;
          } else {
            this.errorMsg = "";
            const obj = {
              name: this.name,
              email: this.email,
              dob: this.dob,
              number: this.number,
              password: this.password,
            };
            arr.push(obj);
            this.setData(arr);
            this.router.push({ path: "/login" });
          }
        }
        this.name = "";
        this.email = "";
        this.dob = "";
        this.number = "";
        this.password = "";
        this.cPassword = "";
      } else {
        this.errorMsg = "Please check your inputs";
      }
    },
  },
  watch: {
    name(val) {
      if (!val.match(/^[a-zA-Z]+$/)) {
        this.errorMsg = "please enter only alphabates";
        this.flag = false;
      } else {
        this.errorMsg = "";
        this.flag = true;
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
        <form action="" class="form-control bg-light p-5" @:submit.prevent="add">
          <h4 class="text-center">Register</h4>
          <br />
          <input type="text" class="form-control mb-4" placeholder="Enter Name" v-model="name" required />
          <input type="email" class="form-control mb-4" placeholder="Enter Email" v-model="email" required />
          <label for="" class="">Enter Date Of Birth</label><br />
          <input type="date" class="form-control mb-4" v-model="dob" required max="2024-03-12" />
          <input type="number" name="" id="" class="form-control mb-4" placeholder="Enter Phone Number" v-model="number" required />
          <input type="password" name="" id="" class="form-control mb-4" placeholder="Enter password" v-model="password" required />
          <input type="password" name="" id="" class="form-control mb-4" placeholder="Confirm Password" v-model="cPassword" required />

          <div v-if="errorMsg" class="fs-5 text-danger text-center">{{ errorMsg }}</div>
          <br />
          <div>Alreday have an Account? <router-link to="/login">Sign in</router-link></div>
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
