export const actions = {
  /**
   *
   * @param context
   * @param payload {Object<{email: String, password: String, repeatPassword: String, agree: Boolean}>}
   * @returns {Promise<AxiosResponse<any>>}
   */
  registerUser(context, payload) {
    return this.$axios.$post("/users/register/", payload);
  },

  /**
   *
   * @param context
   * @param payload {Object<{email: String, password: String}>}
   * @returns {Promise<AxiosResponse<any>>}
   */
  loginUser(context, payload) {
    return this.$axios.$post("/user/login", payload);
  },

  /**
   *
   * @param context
   * @param payload {Object<{email: String}>}
   * @returns {Promise<AxiosResponse<any>>}
   */
  recoverPassword(context, payload) {
    return this.$axios.$post("/users/password/reset/", payload);
  },

  /**
   *
   * @param context
   * @param payload {Object<{token: String, password: String}>}
   * @returns {Promise<AxiosResponse<any>>}
   */
  newPassword(context, payload) {
    return this.$axios.$post("/users/password/change/", payload);
  },

  /**
   *
   * @param context
   * @param payload {Object<{token: String}>}
   * @returns {Promise<AxiosResponse<any>>}
   */
  verifyEmail(context, payload) {
    return this.$axios.$post("/users/email/verify/", payload);
  },

  /**
   *
   * @param context
   * @param payload {Object<{token: String}>}
   * @returns {Promise<AxiosResponse<any>>}
   */
  refreshTokens(context, payload) {
    return this.$axios.$post(
      "/users/user/refresh",
      {},
      {
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
      }
    );
  },
};
