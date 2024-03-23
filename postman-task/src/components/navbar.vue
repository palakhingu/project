<script>
import AuthService from "../services/AuthService";

export default {
  data() {
    return {
      drawer: false,
    };
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

  <v-app-bar app color="dark" class="text-white">
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    <router-link to="/" class="router-link"><v-toolbar-title>My App</v-toolbar-title></router-link>
    <v-spacer></v-spacer>
    <router-link to="/" class="router-link"><v-btn text>Register</v-btn></router-link>
    <router-link to="/login" class="router-link"><v-btn text>Login</v-btn></router-link>
    <router-link to="/addTask" class="router-link"><v-btn text>Add Task</v-btn></router-link>
    <router-link to="/displayTask" class="router-link"><v-btn text>Display Task</v-btn></router-link>
    <v-btn text @click="logout">Logout</v-btn>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" app>
    <v-list>
      <router-link to="/" class="router-link">
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Register</v-list-item-title>
        </v-list-item>
      </router-link>
      <router-link to="/login" class="router-link">
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-login</v-icon>
          </v-list-item-icon>
          <v-list-item-title>login</v-list-item-title>
        </v-list-item>
      </router-link>
      <router-link to="/addTask" class="router-link">
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-plus-box</v-icon>
          </v-list-item-icon>
          <v-list-item-title>add Task</v-list-item-title>
        </v-list-item>
      </router-link>
      <router-link to="/dispkayTask" class="router-link">
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-check-circle-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Display Task</v-list-item-title>


        </v-list-item>
      </router-link>

    </v-list>
  </v-navigation-drawer>
</template>
<style>
.router-link {
  text-decoration: none;
  color: inherit;
}
</style>
