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
  main: 0,
};

const mutations = {
  DECREMENT_MAIN_COUNTER(state) {
    state.main--;
  },
  INCREMENT_MAIN_COUNTER(state) {
    state.main++;
  },
};

const actions = {
  someAsyncTask({ commit }) {
    // do something async
    commit("INCREMENT_MAIN_COUNTER");
  },
};

export default {
  state,
  mutations,
  actions,
  instance,
};
