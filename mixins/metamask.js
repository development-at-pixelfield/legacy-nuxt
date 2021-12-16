export default {
  data() {
    return {
      metamaskAccount: "",
      balance: 0,
      balanceLoaded: false,
    };
  },
  computed: {
    metamask() {
      return this.$metamask();
    },
  },
  methods: {
    async getBalance() {
      if (this.metamaskAccount) {
        const balanceWei = await this.metamask.getBalance(this.metamaskAccount);
        this.balance = this.metamask.fromWeiToEth(balanceWei);
        this.balanceLoaded = true;
      }
      return false;
    },
    async connectMetamask() {
      if (!this.metamask.isEnabled) {
        await this.$store.commit("setSnackbar", {
          show: true,
          message: this.$t("snackbar.metaMask.extensionNotInstalled"),
          color: "error",
        });
        return;
      }
      console.log("get accounts");
      try {
        const accounts = await this.metamask.getAccounts();
        if (!accounts.length) {
          await this.$store.commit("setSnackbar", {
            show: true,
            message: this.$t("snackbar.metaMask.accountsIsNotConnected"),
            color: "error",
          });
          return;
        }
        this.metamaskAccount = accounts.shift();
      } catch (e) {
        await this.$store.commit("setSnackbar", {
          show: true,
          message: this.$t("snackbar.metaMask.accountsIsNotConnected"),
          color: "error",
        });
      }
    },
  },
};
