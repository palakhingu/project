<script>
// import { ref, watch, computed } from "vue";
// import { isProxy, toRaw } from "vue";
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
      let arr = this.getData();
      if (arr === null) {
        const obj = {
          name: this.name,
          email: this.email,
          dob: this.dob,
          number: this.number,
          password: this.password,
          cPassword: this.cPassword,
        };
        let data = [obj];
        this.setData(data);
        this.router.push({ path: "/login" });
      } else {
        const obj = {
          name: this.name,
          email: this.email,
          dob: this.dob,
          number: this.number,
          password: this.password,
          cPassword: this.cPassword,
        };
        arr.push(obj);
        this.setData(arr);
        this.router.push({ path: "/login" });
      }
      this.name = "";
      this.email = "";
      this.dob = "";
      this.number = "";
      this.password = "";
      this.cPassword = "";
    },
  },
  watch: {
    // name(val) {
    //   if (val.match(/^[a-zA-Z]+$/)) {
    //     this.errorMsg = "";
    //   } else if (val == "") {
    //     this.errorMsg = "";
    //   } else {
    //     this.errorMsg = "please enter only alphabate";
    //   }
    // },
    number(val) {
      if (/^\d{10}$/.test(val)) {
        this.errorMsg = "";
      } else {
        this.errorMsg = "please enter 10 digit number";
      }
    },
  },
};

// const add = () => {
//   if (name.value < 3) {
//     errorMsg.value = "Name is required";
//     return;
//   } else if (number.value.length < 10) {
//     errorMsg.value = "please enter 10 digit mobile number";
//   } else if (password.value.length < 4) {
//     errorMsg.value = "password must be 4 character long";
//   } else if (cPassword.value.length < 4) {
//     errorMsg.value = "password must be 4 character long";
//   } else if (password.value !== cPassword.value) {
//     errorMsg.value = "password not match";
//   } else {
//     errorMsg.value = "";

//     let arr = getData();
//     console.log(arr);
//     if (arr === null) {
//       const obj = {
//         name: name.value,
//         email: email.value,
//         dob: dob.value,
//         number: number.value,
//         password: password.value,
//         cPassword: cPassword.value,
//       };
//       let data = [obj];
//       setData(data);
//     } else {
//       const obj = {
//         name: name.value,
//         email: email.value,
//         dob: dob.value,
//         number: number.value,
//         password: password.value,
//         cPassword: cPassword.value,
//       };
//       arr.push(obj);
//       setData(arr);
//     }
//     name.value = "";
//     email.value = "";
//     dob.value = "";
//     number.value = "";
//     password.value = "";
//     cPassword.value = "";
//   }
// };
// //get data
// function getData() {
//   let arr = JSON.parse(localStorage.getItem("userInfo"));
//   return arr;
// }
// //set data
// function setData(arr) {
//   localStorage.setItem("userInfo", JSON.stringify(arr));
// }
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-3 col-md-1 col-sm-1"></div>
      <div class="col-lg-5 col-md-9 col-sm-1">
        <form action="" class="form-control bg-light p-5" v-on:submit.prevent="add">
          <h4 class="text-center">Register</h4>
          <br />
          <input type="text" class="form-control mb-4" placeholder="Enter Name" v-model="name" required />
          <input type="email" class="form-control mb-4" placeholder="Enter Email" v-model="email" required />
          <label for="" class="">Enter Date Of Birth</label><br />
          <input type="date" class="form-control mb-4" v-model="dob" required />
          <input type="number" name="" id="" class="form-control mb-4" placeholder="Enter Phone Number" v-model="number" required />
          <input type="password" name="" id="" class="form-control mb-4" placeholder="Enter password" v-model="password" required />
          <input type="password" name="" id="" class="form-control mb-4" placeholder="Confirm Password" v-model="cPassword" required />

          <div v-if="errorMsg" class="fs-5 text-danger text-center">{{ errorMsg }}</div>

          <br />
          <div>Alreday have an Acoout? <router-link to="/login">Sign in</router-link></div>
          <button type="submit" class="btn btn-dark mt-4">Submit</button>
        </form>
      </div>
      <div class="col-lg-4 col-md-1 col-sm-1"></div>
    </div>
  </div>
</template>

<style scoped>
.container {
  margin: 70px auto;
}
</style>
