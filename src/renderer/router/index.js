import Vue from "vue";
import Router from "vue-router";
import FormPage from "@/views/FormPage";
import RitmCaputurer from "@/views/RitmCapturer";
import LoginPage from "@/views/LoginPage";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/itam",
      name: "form-page",
      component: FormPage,
    },
    {
      path: "/",
      name: "ritm-capturer",
      component: RitmCaputurer,
    },
    // {
    //   path: '/oauth_redirect.do',
    //   redirect: '/ritm'
    // },
    {
      path: "*",
      redirect: "/",
    },
  ],
});
