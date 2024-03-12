<script>
// import { auth } from "../main";
import { useRouter } from "vue-router";
export default {
  data() {
    return {
      email: "",
      password: "",
      name: "",
      dob: "",
      cPassword: "",
      number: "",
      router: useRouter(),
      errorMsg: "",
    };
  },
  methods: {
    registerUser() {
      if (this.password !== this.cPassword) {
        this.errorMsg = "Password does not match";
        return;
      } else if (!/^\d{10}$/.test(this.number)) {
        this.errorMsg = "please enter 10 digit number";
        return;
      } else {
        this.$firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then((userCredential) => {
            const user = userCredential.user;
            const userInfo = {
              name: this.name,
              email: this.email,
              dob: this.dob,
              number: this.number,
              password: this.password,
            };
            this.$firebase
              .firestore()
              .collection("users")
              .doc(user.uid)
              .set(userInfo)
              .then(() => {
                console.log("User data saved successfully");
                this.router.push({ path: "/login" });
              })
              .catch((error) => {
                console.error("Error adding user data: ", error);
                this.errorMsg = error.message;
              });
          })
          .catch((error) => {
            console.error("Error creating user: ", error);
            // this.errorMsg = error.message;
            if (error.message === "Firebase: Password should be at least 6 characters (auth/weak-password).") {
              this.errorMsg = "Password should be at least 6 characters";
            } else if (error.message === "Firebase: The email address is already in use by another account. (auth/email-already-in-use).") {
              this.errorMsg = "email already exists";
            } else {
              this.errorMsg = "";
            }
          });
      }
    },

    googleSignIn: function () {
      let provider = new this.$firebase.auth.GoogleAuthProvider();
      this.$firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          let token = result.credential.accessToken;
          let user = result.user;
          console.log(token); // Token
          console.log(user); // User that was authenticated
          this.router.push({ path: "/dashboard" });
        })
        .catch((err) => {
          console.log(err); 
        });
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
        <form action="" class="form-control bg-light p-5" @:submit.prevent="registerUser">
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
          <center>
            <button type="submit" class="btn btn-dark mt-4">Submit</button>
          </center>
          <hr />
          <h5 class="text-center">or</h5>
          <center>
            <button @click="googleSignIn" class="btn btn-dark">Sign up with Google</button>
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
