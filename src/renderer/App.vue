<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="breadcrumb fixed">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item" :class="(active = true)">
          <router-link
            class="nav-link"
            :class="{'active':true}"
            exact
            :to="{ name: 'ritm-capturer' }"
          >Select Ritm</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'form-page' }">Fill Form</router-link>
        </li>
      </ul>
      <button class="btn btn-primary" @click="login">Login</button>
      <div>
        <button class="btn btn-danger" @click="logOff()">
          Logoff
          <span>{{user.name}}</span>
        </button>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
// const { ipcRenderer } = require("electron");
import { mapState, mapActions } from "vuex";

export default {
  name: "app",
  data() {
    return {
      user: {
        name: "yerr",
      },
      accessToken: null,
    };
  },
  created() {
    // let accessToken = ipcRenderer.sendSync("loginPrompt", {});
    // if (accessToken !== undefined) {
    //   this.accessToken = accessToken;
    // }
  },
  computed: mapState(["auth"]),
  methods: mapActions(["login"]),
};
</script>

<style>
html,
body {
  height: 100%;
}
</style>
