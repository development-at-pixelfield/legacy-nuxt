export default {
  computed: {
    async fetchEthPrice() {
      if (!this.$store.state.ethPrice) {
        await this.$store.dispatch("fetchEthPrice");
      }
      return this.$store.state.ethPrice;
    },
    calculateEthToUsd() {
      return (ethAmount) => {
        return "est. $" + this.fetchEthPrice * ethAmount + "K";
      };
    },
  },
};
