<script>
// import { auth } from "../main";
import { useRouter } from "vue-router";
import axios from "axios";
export default {
  data() {
    return {
      // user: {
      email: "",
      password: "",
      name: "",
      dob: "",
      cPassword: "",
      number: "",
      // },
      router: useRouter(),
      errorMsg: "",
      postData: [],
    };
  },

  methods: {
    AddData() {
      if (!/^\d{10}$/.test(this.number)) {
        this.errorMsg = "please enter 10 digit number";
        return;
      } else if (this.password !== this.cPassword) {
        this.errorMsg = "Password does not match ";
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
            axios
              .post(`https://fir-auth-15721-default-rtdb.firebaseio.com/user.json`, userInfo)
              .then((response) => {
                console.log("added");
                this.user = {
                  email: "",
                  password: "",
                  name: "",
                  dob: "",
                  cPassword: "",
                  number: "",
                };
                this.router.push("/login");
              })
              .catch((error) => {
                console.error("Error adding user:", error);
              });
          })
          .catch((error) => {
            console.error("Error creating user: ", error);
            if (error.code === "auth/weak-password") {
              this.errorMsg = "Password should be at least 6 characters";
            } else if (error.code === "auth/email-already-in-use") {
              this.errorMsg = "email already exists";
            } else {
              this.errorMsg = "";
            }
          });
      }
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
<!-- <template>
  <div>
    <h2>User Management</h2>
    <form @submit.prevent="addUser">
      <input type="text" v-model="newUser.name" placeholder="Enter name" required>
      <input type="email" v-model="newUser.email" placeholder="Enter email" required>
      <button type="submit">Add User</button>
    </form>
    <ul>
      <li v-for="(user, index) in users" :key="index">
        <p>{{ user.name }} - {{ user.email }}</p>
        <button @click="editUser(user)">Edit</button>
        <button @click="deleteUser(user)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      users: [],
      newUser: {
        name: '',
        email: ''
      }
    }
  },
  mounted() {
    this.fetchUsers()
  },
  methods: {
    fetchUsers() {
      axios.get('https://YOUR_PROJECT_ID.firebaseio.com/users.json')
        .then(response => {
          this.users = Object.values(response.data)
        })
        .catch(error => {
          console.error('Error fetching users:', error)
        })
    },
    addUser() {
      axios.post('https://YOUR_PROJECT_ID.firebaseio.com/users.json', this.newUser)
        .then(response => {
          console.log('User added successfully')
          this.newUser = { name: '', email: '' }
          this.fetchUsers()
        })
        .catch(error => {
          console.error('Error adding user:', error)
        })
    },
    editUser(user) {
      // Implement edit functionality
      console.log('Edit user:', user)
    },
    deleteUser(user) {
      axios.delete(`https://YOUR_PROJECT_ID.firebaseio.com/users/${user.id}.json`)
        .then(response => {
          console.log('User deleted successfully')
          this.fetchUsers()
        })
        .catch(error => {
          console.error('Error deleting user:', error)
        })
    }
  }
}
</script> -->
