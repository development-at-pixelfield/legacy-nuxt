export const actions = {
  /**
   *
   * @param context
   * @param payload {Object<{email: String, password: String, agree: Boolean}>}
   * @returns {Promise<AxiosResponse<any>>}
   */
  registerUser(context, payload) {
    return this.$axios.$post("/api/users/register/", payload);
  },

  /**
   *
   * @param context
   * @param payload {Object<{email: String, password: String}>}
   * @returns {Promise<AxiosResponse<any>>}
   */
  loginUser(context, payload) {
    return this.$axios.$post("/api/users/auth/", payload);
  },

  /**
   *
   * @param context
   * @param payload {Object<{email: String}>}
   * @returns {Promise<AxiosResponse<any>>}
   */
  recoverPassword(context, payload) {
    return this.$axios.$post("/api/users/password/reset/", payload);
  },

  /**
   *
   * @param context
   * @param payload {Object<{password: String, code: String}>}
   * @returns {Promise<AxiosResponse<any>>}
   */
  confirmRecoverPassword(context, payload) {
    return this.$axios.$post("/api/users/password/reset/confirm/", payload);
  },

  /**
   *
   * @param context
   * @param payload {Object<{old_password: String, new_password: String}>}
   * @returns {Promise<AxiosResponse<any>>}
   */
  newPassword(context, payload) {
    return this.$axios.$post("/api/users/password/change/", payload);
  },

  /**
   *
   * @param context
   * @returns {Promise<AxiosResponse<any>>}
   */
  disableAccount(context) {
    return this.$axios.$post("/api/users/disable/");
  },

  /**
   *
   * @param context
   * @param payload {Object<{token: String}>}
   * @returns {Promise<AxiosResponse<any>>}
   */
  verifyEmail(context, payload) {
    return this.$axios.$post("/api/users/email/verify/", payload);
  },

  /**
   *
   * @param context
   * @param payload {Object<{email: String, nft_notifications: Boolean}>}
   * @returns {Promise<AxiosResponse<any>>}
   */
  updateProfile(context, payload) {
    return this.$axios.$patch("/api/users/update/", payload);
  },

  /**
   *
   * @param context
   * @returns {Promise<AxiosResponse<any>>}
   */
  resendVerificationEmail(context) {
    return this.$axios.$post("/api/users/email/resend/");
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
