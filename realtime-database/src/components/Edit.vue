<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-3 col-md-1 col-sm-1"></div>
      <div class="col-lg-5 col-md-10 col-sm-12">
        <form action="" class="form-control bg-light p-5" @submit.prevent="updateUser">
          <h4 class="text-center">Edit User</h4>
          <br />
          <input type="text" class="form-control mb-4" placeholder="Enter Name" v-model="userData.name" required />
          <input type="email" class="form-control mb-4" placeholder="Enter Email" v-model="userData.email" required />
          <label for="" class="">Enter Date Of Birth</label><br />
          <input type="date" class="form-control mb-4" v-model="userData.dob" required max="2024-03-12" />
          <input type="number" name="" id="" class="form-control mb-4" placeholder="Enter Phone Number" v-model="userData.number" required />
          <input type="password" name="" id="" class="form-control mb-4" placeholder="Enter Your password" v-model="userData.password" required />

          <div v-if="errorMsg" class="fs-5 text-danger text-center">
            {{ errorMsg }}
          </div>
          <br />
          <center>
            <button type="submit" class="btn btn-dark mt-4">Update</button>
          </center>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      userData: {
        name: "",
        email: "",
        dob: "",
        number: "",
        password: "",
      },
      errorMsg: "",
    };
  },
  methods: {
    fetchUserData() {
      const userId = this.$route.params.id;
      console.log(userId);
      axios
        .get(`https://fir-auth-15721-default-rtdb.firebaseio.com/user/${userId}.json`)
        .then((response) => {
          this.userData = response.data;
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          this.errorMsg = "Failed to fetch user data. Please try again.";
        });
    },
    updateUser() {
      const userData = {
        name: this.userData.name,
        email: this.userData.email,
        dob: this.userData.dob,
        number: this.userData.number,
      };
      const userId = this.$route.params.id;
      axios
        .put(`https://fir-auth-15721-default-rtdb.firebaseio.com/user/${userId}.json`, userData)
        .then((response) => {
          console.log("User updated successfully", response.data);
          this.$router.push("/dashboard");
        })
        .catch((error) => {
          console.error("Error updating user:", error.response.data);
          this.errorMsg = "Failed to update user. Please try again.";
        });
    },
  },
  mounted() {
    this.fetchUserData();
  },
};
</script>
<style scoped>
.container {
  margin: 70px auto;
}
</style>
