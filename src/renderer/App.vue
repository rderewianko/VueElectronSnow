<template>
  <div>
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
        <button v-if="authenticated" class="btn btn-danger" @click="logOff()">Logoff</button>
        <button v-else class="btn btn-primary" @click="login()">Login</button>
      </div>
    </nav>
    <router-view></router-view>
    <button @click="increment">TEST</button>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
const { ipcRenderer } = require("electron");

export default {
  name: "app",
  data() {
    return {
      authenticated: false,
      accessToken: null,
    };
  },
  created() {
    let accessToken = ipcRenderer.sendSync("loginPrompt", {});
    if (accessToken !== undefined) {
      this.accessToken = accessToken;
      this.authenticated = true;
    }
  },
  methods: {
    logOff() {
      let off = ipcRenderer.sendSync("logOut", {});
      if (off !== undefined) {
        this.authenticated = false;
      }
    },
    logIn() {
      let accessToken = ipcRenderer.sendSync("loginPrompt", {});
      if (accessToken !== undefined) {
        this.accessToken = accessToken;
        this.authenticated = true;
      }
    },
    increment() {
      console.log("clicked");
      this.$store.dispatch("someAsyncTask");
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
