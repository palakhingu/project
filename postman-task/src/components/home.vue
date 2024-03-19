<!-- <template>
  <div v-if="user">
    <h1>hello, {{ user.name }}</h1>
    <p>Email: {{ user.email }}</p>
  </div>
 
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      user: null,
    };
  },
  mounted() {
    let token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://192.168.1.61:3000/user/get")
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error("Failed to fetch user details:", error);
          // handle error
        });
    }
  },
};
</script> -->

<template>
  <div>
    <h4>Welcome, {{ userInfo.name }}</h4>
    <button @click="logout" class="btn btn-dark">Logout</button><br /><br />
    <router-link to="/addTask" class="btn btn-dark">Add Task</router-link>
  </div>
</template>

<script>
import AuthService from "../services/AuthService";

export default {
  data() {
    return {
      userInfo: {},
    };
  },
  created() {
    this.userInfo = AuthService.getUserInfo();
  },
  methods: {
    logout() {
      AuthService.logout();
      this.$router.push("/");
    },
  },
};
</script>
