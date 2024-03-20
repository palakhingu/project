<script>
import AuthService from "../services/AuthService";

export default {
  data() {
    return {};
  },
  methods: {
    logout() {
      AuthService.logout();
      this.$router.push("/login");
    },
  },
};
</script>
<template>
  <nav class="navbar navbar-dark bg-dark">
    <div class="navbar-brand">&nbsp; &nbsp; Navbar</div>
    <div class="navbar-item">
      <router-link to="/" class="text-white text-decoration-none">Register</router-link>&nbsp; &nbsp; <router-link to="/login" class="text-white text-decoration-none">Login</router-link>&nbsp; &nbsp;
      <router-link to="/addTask" class="text-white text-decoration-none">Add Task</router-link>&nbsp; &nbsp;
      <router-link to="/displayTask" class="text-white text-decoration-none">Display Task</router-link>&nbsp; &nbsp; <button @click="logout" class="btn btn-primary">Logout</button>&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp; &nbsp;
    </div>
  </nav>
</template>
