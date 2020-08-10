import Vue from "vue";
import axios from "axios";

import App from "./App";
import router from "./router";
import store from "./store";

import Notifications from "vue-notification";

import msal from "vue-msal";

Vue.use(Notifications);

Vue.use(msal, {
  auth: {
    clientId: "4b20b21c-de80-4dc0-ac83-e1e895041f04",
    redirectUri: "http://localhost:9080",
  },
});

if (!process.env.IS_WEB) Vue.use(require("vue-electron"));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  created() {
    if (!this.$msal.isAuthenticated()) {
      this.$msal.signIn();
    }
  },
  components: { App },
  router,
  store,
  template: "<App/>",
}).$mount("#app");
