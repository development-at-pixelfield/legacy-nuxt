import Vuex from "vuex";
import user from "./user/state";
import nfts from "./nfts/state";

export const defaultValues = () => ({
  snackbar: {
    show: false,
    message: "",
    color: "success",
  },
  modal: {
    show: false,
    type: null,
    data: null,
    close: "",
  },
  query: {},
  eth: null,
});

export const state = defaultValues;

export const mutations = {
  setSnackbar(state, payload) {
    state.snackbar = payload;
  },
  setModal(state, payload) {
    state.modal = payload;
  },
  setQuery(state, payload) {
    state.query = payload;
  },
  setEthPrice(state, value) {
    if (
      new Date().getTime() / 1000 - value.last_fetched.getTime() / 1000 >= 10 ||
      !this.eth
    ) {
      // console.log("fetching");
      state.ethPrice = value;
    }
  },
};

export const actions = {
  async nuxtServerInit({ commit }) {
    const response = await this.$axios.$get(`/nfts/fetch/eth-to-usd/`);
    commit("setEthPrice", { rate: response.rate, last_fetched: new Date() });
    return response;
  },
  // sharedDocuments(context, payload) {
  //   return this.$axios.$get("/shared/documents/list/?format=json");
  // },
};

export const getters = {
  snackbar: (state) => state.snackbar,
  modal: (state) => state.modal,
  query: (state) => state.query,
  ethPrice: (state) => state.ethPrice,
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
      nfts,
    },
  });

export default createStore;
