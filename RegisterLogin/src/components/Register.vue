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
<!-- <template>
  <div>
    <input v-model="email" placeholder="Email">
    <input type="password" v-model="password" placeholder="Password">
    <button @click="login">Login</button>
    <button @click="signInWithGoogle">Sign In with Google</button>
    <router-link to="/registration">Don't have an account? Sign Up</router-link>

    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    login() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then((userCredential) => {
          // Login successful
          console.log('Login successful', userCredential.user);
        })
        .catch((error) => {
          // Handle login errors
          console.error('Login failed', error);
          this.handleLoginError(error);
        });
    },
    signInWithGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider)
        .then((result) => {
          // Google sign-in successful
          console.log('Google sign-in successful', result.user);
        })
        .catch((error) => {
          // Handle Google sign-in errors
          console.error('Google sign-in failed', error);
          this.handleGoogleSignInError(error);
        });
    },
    handleLoginError(error) {
      switch (error.code) {
        case 'auth/user-not-found':
          this.errorMessage = 'User not found. Please check your email and try again.';
          break;
        case 'auth/wrong-password':
          this.errorMessage = 'Incorrect password. Please try again.';
          break;
        default:
          this.errorMessage = 'An error occurred. Please try again later.';
          break;
      }
    },
    handleGoogleSignInError(error) {
      switch (error.code) {
        case 'auth/account-exists-with-different-credential':
          this.errorMessage = 'An account already exists with the same email address but different sign-in credentials.';
          break;
        default:
          this.errorMessage = 'An error occurred. Please try again later.';
          break;
      }
    }
  }
}
</script>

<style>
.error-message {
  color: red;
  margin-top: 10px;
}
</style> -->
