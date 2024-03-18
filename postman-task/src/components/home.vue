<template>
  <div v-if="user">
    <h1>hello, {{ user.name }}</h1>
    <p>Email: {{ user.email }}</p>
    <!-- Other user details -->
  </div>
  <!-- <div v-else>
    <p>Please log in to view your details</p>
  </div> -->
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
</script>
