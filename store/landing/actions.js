export const actions = {
  /**
   *
   * @param context
   * @param payload {Object<{faq: Array, constellations: Array, blogs: Array}>}
   * @returns {Promise<AxiosResponse<any>>}
   */
  feed(context, payload) {
    return this.$axios.$get("/shared/feed/");
  },
  async subscribe(conetxt, payload) {
    return await this.$axios.$post("/users/subscribe/", payload);
  },
};
