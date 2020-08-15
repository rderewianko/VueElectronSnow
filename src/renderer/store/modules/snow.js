const axios = require("axios");

// SNOW CREDS
const BASE_URL = "https://dev81248.service-now.com/api/now/table/";
const SNOW_USER = "Stevec";
const SNOW_PASS = "Console.L0g";

// Axios Configuration
const instance = axios.create({
  baseURL: BASE_URL,
  auth: {
    username: SNOW_USER,
    password: SNOW_PASS,
  },
});

const state = {
  requests: [],
};

const mutations = {
  UPDATE_REQUESTS(state, payload) {
    state.requests = payload;
  },
};

const actions = {
  getRequest({ commit }) {
    instance
      .get(`sc_request?sysparm_limit=1`)

      .then((data) => {
        let res = data.data.result;
        // console.log(res);
        commit("UPDATE_REQUESTS", res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

export default {
  state,
  mutations,
  actions,
};
