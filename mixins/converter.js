export default {
  computed: {
    fetchEthPrice() {
      return this.$store.state.ethPrice;
    },
    calculateEthToUsd() {
      return (ethAmount) => {
        return "est. $" + this.fetchEthPrice.rate * ethAmount + "K";
      };
    },
  },
};
