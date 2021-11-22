import Vuex from "vuex";
import user from "./user/state";

export const defaultValues = () => ({
  snackbar: {
    show: false,
    message: "",
    color: "success",
  },
});

export const state = defaultValues;

export const mutations = {
  setSnackbar(state, payload) {
    state.snackbar = payload;
  },
};

export const actions = {
  // sharedDocuments(context, payload) {
  //   return this.$axios.$get("/shared/documents/list/?format=json");
  // },
};

export const getters = {
  snackbar: (state) => state.snackbar,
};

const createStore = () =>
  new Vuex.Store({
    namespaced: true,
    // strict: debug,
    state,
    getters,
    actions,
    mutations,
    modules: {
      user,
    },
  });

export default createStore;
