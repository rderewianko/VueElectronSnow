<template>
  <div v-if="this.$msal.isAuthenticated()">
    <nav aria-label="breadcrumb fixed">
      <ol class="breadcrumb">
        <li class="breadcrumb-item" :class="(active = true)">
          <router-link :to="{ name: 'ritm-capturer' }">Select Ritm</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link :to="{ name: 'form-page' }">Fill Form</router-link>
        </li>
        <span v-if="user">
          <button class="btn btn-small btn-danger" @click="$msal.signOut()">Log Out {{name}}</button>
        </span>
      </ol>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "my-project",
  data() {
    return {
      name: "",
    };
  },
  created() {
    if (!this.$msal.isAuthenticated()) {
      this.$msal.signIn();
    }
    let u = this.$msal.data.user.name;
    this.name = u;
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
};
</script>

<style>
html,
body {
  height: 100%;
}
</style>
