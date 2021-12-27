import { functions } from "../../utils";

export const actions = {
  /**
   *
   * @param context
   * @param payload {Object<{page: Number, page_size: Number, ordering: String, luminosity__in: String, quality_level__in: String, name: String,
   * age: String, is_constellation: Boolean, nft_type: String, eth_price__gte: Number, eth_price__lte: Number, constellation: String}>}
   * @returns {Promise<AxiosResponse<any>>}
   */
  getNfts(context, payload) {
    payload.page = payload && payload.page ? +payload.page : 1;
    payload.page_size = payload && payload.page_size ? +payload.page_size : 12;
    payload = functions.arrayToStr(payload);
    payload = functions.cleanObject(payload);
    const queryString = functions.objectToQuery(payload);
    const url = `/nfts/?${queryString}`;
    return this.$axios.$get(url);
  },

  getRoadmap(context, payload) {
    payload.page = payload && payload.page ? +payload.page : 1;
    payload.page_size = payload && payload.page_size ? +payload.page_size : 10;
    payload = functions.arrayToStr(payload);
    payload = functions.cleanObject(payload);
    const queryString = functions.objectToQuery(payload);
    const url = `/nfts/roadmap/features/?${queryString}`;
    return this.$axios.$get(url);
  },

  /**
   *
   * @param context
   * @param payload {Object<{uid: String}>}
   * @returns {Promise<AxiosResponse<any>>}
   */
  getNftsById(context, payload) {
    return this.$axios.$get(`/nfts/${payload.uid}/`);
  },
  /**
   *
   * @param context
   * @param payload {}
   * @returns {Promise<AxiosResponse<any>>}
   */
  getMyNfts(context, payload) {
    return this.$axios.$get(`/nfts/my/list/`);
  },
  /**
   *
   * @param context
   * @param payload {}
   * @returns {Promise<AxiosResponse<any>>}
   */
  getLeaderboard(context, payload) {
    return this.$axios.$get(`/nfts/current/leaderboard/`);
  },

  /**
   *
   * @param context
   * @param payload {}
   * @returns {Promise<AxiosResponse<any>>}
   */
  getNftsForm(context, payload) {
    return this.$axios.$get(`/nfts/form/data/`);
  },
  /**
   * Init payment
   * @param context
   * @param payload{Object<{offer_uid: string, account_address: string}>}
   * @returns {Promise<any>}
   */
  initPayment(context, payload) {
    return this.$axios.$post(`/nfts/sell_offers/payment/init/`, payload);
  },

  voteRoadmap(context, payload) {
    return this.$axios.$post(`/nfts/roadmap/vote/${payload}/`);
  },
};
