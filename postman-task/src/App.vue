<script>
import navbar from "./components/navbar.vue";
export default {
  components: {
    navbar,
  },
};
</script>

<template>
  <!-- <navbar /> -->
  <v-app>
    <router-view></router-view>

  </v-app>
</template>

<style scoped></style>
