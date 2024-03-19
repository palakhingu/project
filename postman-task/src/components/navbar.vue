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
  <nav class="navbar navbar-expand-lg bg-dark fixed-top">
    <div class="container-fluid">
      <a class="navbar-brand ms-5 text-white" href="#">Navbar</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav ms-auto me-3">
          <li class="nav-item">
            <router-link to="/" class="nav-link text-white">Sign Up</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/login" class="nav-link text-white">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/addTask" class="nav-link text-white">Add Task</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/displayTask" class="nav-link text-white">Display Task</router-link>
          </li>
          <li class="nav-item">
            <button class="btn btn-primary" @click="logout">Logout</button>
          </li>
        </div>
        <div class="me-5"></div>
      </div>
    </div>
  </nav>
  <template />
</template>
