import Vuex from "vuex";
import user from "./user/state";
import nfts from "./nfts/state";
import landing from "./landing/state";

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
  ethPrice: null,
  hasWallet: false,
  walletAccount: null,
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
  setWallet(state, payload) {
    state.hasWallet = payload;
  },
  setWalletAccount(state, payload) {
    state.walletAccount = payload;
  },
  setEthPrice(state, amount) {
    state.ethPrice = amount;
  },
};

export const actions = {
  async fetchEthPrice(context) {
    const response = await this.$axios.$get(`/nfts/fetch/eth-to-usd/`);
    context.commit("setEthPrice", response.rate);
    return response;
  },
};

export const getters = {
  snackbar: (state) => state.snackbar,
  modal: (state) => state.modal,
  query: (state) => state.query,
  ethPrice: (state) => state.ethPrice,
  hasWallet: (state) => state.hasWallet,
  walletAccount: (state) => state.walletAccount,
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
      landing,
    },
  });

export default createStore;
