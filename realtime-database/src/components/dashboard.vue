<script>
import axios from "axios";
import { useRoute } from "vue-router";
export default {
  data() {
    return {
      postData: [],
      router: useRoute(),
    };
  },
  mounted() {
    this.getdata();
  },
  methods: {
    deleteUserData(userId, index) {
      axios
        .delete(`https://fir-auth-15721-default-rtdb.firebaseio.com/user/${userId}.json`)
        .then(() => {
          this.postData.splice(index, 1);
          console.log("User data deleted successfully");
        })
        .catch((error) => {
          console.error("Error deleting user data:", error);
        });
    },

    deleteUserFromAuth(userId) {
      this.$firebase
        .auth()
        .currentUser.delete()
        .then(() => {
          console.log("User deleted successfully from Firebase Authentication");
        })
        .catch((error) => {
          console.error("Error deleting user from Firebase Authentication:", error);
        });
    },

    deleteUser(post, index) {
      this.deleteUserData(post.id, index);
      this.deleteUserFromAuth(post.id);
    },
    getdata() {
      axios
        .get("https://fir-auth-15721-default-rtdb.firebaseio.com/user.json")
        .then((res) => {
          this.postData = Object.entries(res.data).map(([id, value]) => ({ id, ...value }));
          console.log(this.postData);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
    editUser(id) {
      this.$router.push({ name: "Edit", params: { id: id } });
    },
  },
};
</script>

<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-2"></div>
      <div class="col-8">
        <table class="table table-striped">
          <thead>
            <tr class="table-dark">
              <th scope="col">No.</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Birthdate</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(post, index) in postData" :key="post.id">
              <td>{{ index + 1 }}</td>
              <td>{{ post.name }}</td>
              <td>{{ post.email }}</td>
              <td>{{ post.dob }}</td>
              <td>
                <button class="btn btn-primary" @click="editUser(post.id)">Edit</button>
                &nbsp;
                <button class="btn btn-danger" @click="deleteUser(post, index)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <center>
          <router-link to="/" class="btn btn-dark">Register</router-link> &nbsp;
          <router-link to="/login" class="btn btn-dark">Login</router-link>
        </center>
      </div>
    </div>
  </div>
</template>
