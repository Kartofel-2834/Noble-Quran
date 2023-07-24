import { createStore } from "vuex";

// Store modules
import playerStore from "./player/index.js";

export default createStore({
  state: {
    ...playerStore.state,
  },

  getters: {
    ...playerStore.getters,
  },

  mutations: {
    ...playerStore.mutations,
  },

  actions: {
    ...playerStore.actions,
  },
  modules: {},
});
