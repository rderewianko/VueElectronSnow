const { ipcRenderer } = require("electron");

const state = {
  token: "",
  user: "",
};

const mutations = {
  SET_USER(state, payload) {
    state.user = payload;
  },
};

const actions = {
  login({ commit }) {
    let token = ipcRenderer.sendSync("loginPrompt", {});
    commit("SET_USER", token);
  },
};
export default {
  state,
  mutations,
  actions,
};
