<template>
  <div v-if="auth.authenticated">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="breadcrumb fixed">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item" :class="(active = true)">
          <router-link
            class="nav-link"
            :class="{ active: true }"
            exact
            :to="{ name: 'ritm-capturer' }"
          >Select Ritm</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'form-page' }">Fill Form</router-link>
        </li>
      </ul>

      <div>
        <button v-if="auth.authenticated" class="btn btn-danger" @click="logOff()">Logoff</button>
        <button v-else class="btn btn-primary" @click="LogIn()">Login</button>
      </div>
    </nav>
    <router-view></router-view>
  </div>
  <div v-else>
    <div class="container p-2">
      <h1 style="text-align:center">Please Log In First</h1>
      <button class="btn btn-block btn-primary" @click="LogIn()">Login</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "app",
  data() {
    return {};
  },
  created() {},
  computed: mapState(["auth"]),
  methods: {
    logOff() {
      this.$store.dispatch("logoff");
    },
    LogIn() {
      this.$store.dispatch("LogIn");
    },
  },
};
</script>

<style>
html,
body {
  height: 100%;
}
</style>
