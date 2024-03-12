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
          // alert("Successfully logged in");
          this.router.push("/dashboard");
        })
        .catch((error) => {
          // alert(error.message);
          //  this.errorMsg = error.message;
          console.log(error);
          if (error.message === "Firebase: The supplied auth credential is incorrect, malformed or has expired. (auth/invalid-credential).") {
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
          <!--<div v-else="flag" class="fs-5 text-center text-danger">{{ errorMsg }}</div> -->
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

<!-- <template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="registerUser">
      <input type="text" v-model="email" placeholder="Email">
      <input type="password" v-model="password" placeholder="Password">
      <input type="text" v-model="name" placeholder="Name">
      <input type="number" v-model="age" placeholder="Age">
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      name: '',
      age: null
    }
  },
  methods: {
    registerUser() {
      this.$firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;

          // Additional user information
          const userInfo = {
            name: this.name,
            age: this.age
            // Add more fields as needed
          };

          // Store additional information in Firestore
          this.$firebase.firestore().collection('users').doc(user.uid).set(userInfo)
            .then(() => {
              console.log("User data saved successfully");
              // Optionally, you can redirect the user to another page after successful registration
            })
            .catch((error) => {
              console.error("Error adding user data: ", error);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error(errorMessage);
        });
    }
  }
}
</script> -->
