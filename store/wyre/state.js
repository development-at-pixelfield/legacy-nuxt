import { actions } from "./actions";

const state = {};

export default {
  namespaced: true,
  state: () => {
    return { ...state };
  },
  actions,
};
