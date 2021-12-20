export default {
  data() {
    return {
      metamaskAccount: "",
      balance: 0,
      balanceLoaded: false,
      hasWallet: false,
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
        // await this.$store.commit("setSnackbar", {
        //   show: true,
        //   message: this.$t("snackbar.metaMask.extensionNotInstalled"),
        //   color: "error",
        // });
        this.$store.commit("setModal", {
          show: true,
          type: "connect-metamask",
          data: {
            confirm: {
              function: () => {
                // this.deleteAccount();
              },
            },
          },
        });
        this.$store.commit("setWallet", false);
        this.$store.commit("setWalletAccount", null);
        const data = {
          email: this.$auth.user.email,
          wallet_address: "",
        };
        await this.$store.dispatch("user/saveWallet", data);
        return;
      }
      try {
        const accounts = await this.metamask.getAccounts();
        if (!accounts.length) {
          await this.$store.commit("setSnackbar", {
            show: true,
            message: this.$t("snackbar.metaMask.accountsIsNotConnected"),
            color: "error",
          });
          this.$store.commit("setWallet", false);
          this.$store.commit("setWalletAccount", null);
          const data = {
            email: this.$auth.user.email,
            wallet_address: "",
          };
          await this.$store.dispatch("user/saveWallet", data);
          return;
        }
        this.metamaskAccount = accounts.shift();
        this.hasWallet = true;
        this.$store.commit("setWallet", true);
        this.$store.commit("setWalletAccount", this.metamaskAccount);
        const data = {
          email: this.$auth.user.email,
          wallet_address: this.metamaskAccount,
        };
        await this.$store.dispatch("user/saveWallet", data);
      } catch (e) {
        await this.$store.commit("setSnackbar", {
          show: true,
          message: this.$t("snackbar.metaMask.accountsIsNotConnected"),
          color: "error",
        });
        this.$store.commit("setWallet", false);
        this.$store.commit("setWalletAccount", null);
        const data = {
          email: this.$auth.user.email,
          wallet_address: "",
        };
        await this.$store.dispatch("user/saveWallet", data);
      }
    },
  },
};
