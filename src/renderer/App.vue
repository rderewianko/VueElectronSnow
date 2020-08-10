<template>
  <div v-if="this.$msal.isAuthenticated()==true">
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
      <button
        class="btn btn-primary"
        v-if="this.$msal.isAuthenticated() != true"
        @click="this.$msal.signIn()"
      >Login</button>
      <div v-else>
        <span>{{user.profile.name}}</span>
        <button class="btn btn-danger" @click="signOff()">Logoff</button>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
// import aad from "./services/aad";
export default {
  name: "my-project",
  data() {
    return {
      username: "",
    };
  },
  created() {
    console.log(this.$msal.isAuthenticated());
    if (!this.$msal.isAuthenticated()) {
      this.$msal.signIn();
    }
  },
  computed: {
    user() {
      let user = null;
      if (this.$msal.isAuthenticated) {
        // Note that the dollar sign ($) is missing from this.msal
        user = {
          ...this.$msal.user,
          profile: {},
        };
        if (this.$msal.graph && this.$msal.graph.profile) {
          user.profile = this.$msal.graph.profile;
        }
      }
      console.log(user);
      return user;
    },
  },
  methods: {
    signOff() {
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
