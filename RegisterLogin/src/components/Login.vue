<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      errorMsg: "",
    };
  },
  methods: {
    check() {
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      let auth = userInfo.some((user) => user.email == this.email && user.password == this.password);
      if (auth) {
       this.errorMsg="sign up successfully"
       this.email=""
      this.password=" "
      } else {
        this.errorMsg="Incorrect login credentials";
      }

    },
  },
};
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-3 col-md-1 col-sm-1"></div>
      <div class="col-lg-5 col-md-9 col-sm-1">
        <form action="" class="form-control bg-light p-5" v-on:submit.prevent="check">
          <h4 class="text-center">Login</h4>
          <br />
          <input type="email" class="form-control mb-4" placeholder="Enter Email" v-model="email" required />
          <input type="password" name="" id="" class="form-control " placeholder="Enter password" v-model="password" required />
          <br />
          <div v-if="errorMsg" class="fs-5 text-danger text-center">{{ errorMsg }}</div>
          <br>
          <div>Don't have an Acoout? <router-link to="/">Sign up</router-link></div>
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
