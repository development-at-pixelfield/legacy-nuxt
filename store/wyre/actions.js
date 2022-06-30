export const actions = {
  async reserve(context, { uid, addressTo }) {
    return await this.$axios.$post(`/wyre/reserve/${uid}/`, { addressTo });
  },
};
