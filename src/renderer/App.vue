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
      <button class="btn btn-primary" @click="this.$msal.signIn()">Login</button>
      <div>
        <button class="btn btn-danger" @click="logOff">
          Logoff
          <span>{{user.name}}</span>
        </button>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import { msalMixin } from "vue-msal";
export default {
  name: "app",
  data() {
    return {};
  },
  created() {
    if (!this.$msal.isAuthenticated()) {
      this.$msal.signIn().then((res) => {
        console.log(res);
      });
    }
  },
  mixins: [msalMixin],
  computed: {
    user() {
      let user = null;
      if (this.msal.isAuthenticated) {
        // Note that the dollar sign ($) is missing from this.msal
        user = {
          ...this.msal.user,
          profile: {},
        };
        if (this.msal.graph && this.msal.graph.profile) {
          user.profile = this.msal.graph.profile;
        }
      }
      return user;
    },
  },
  methods: {
    logOff() {
      this.$msal.signOut();
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
