const { ipcRenderer } = require("electron");

const defatulState = () => {
  return {
    token: "",
    user: "",
    authenticated: false,
  };
};

const state = defatulState();

const mutations = {
  RESET_STATE(state) {
    state.token = null;
    state.user = null;
    state.authenticated = false;
  },
  SET_USER(state, payload) {
    state.token = payload;
    state.authenticated = true;
  },
};

const actions = {
  LogIn({ commit }) {
    let token = ipcRenderer.sendSync("loginPrompt", {});
    commit("SET_USER", token);
  },
  logoff({ commit }) {
    let off = ipcRenderer.sendSync("logOut", {});
    if (off !== undefined) {
      commit("RESET_STATE");
    }
  },
};
export default {
  state,
  mutations,
  actions,
};
