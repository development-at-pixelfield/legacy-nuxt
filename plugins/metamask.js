export default ({ app }, inject) => {
  inject("metamask", () => {
    return {
      errors: {
        client: "This plugin can be used only in client mode render",
        notEnabled: "Metamask is not installed",
      },
      methods: {
        requestAccounts: "eth_requestAccounts",
      },
      isSupport: process.client && window,
      isEnabled: typeof window.ethereum !== "undefined",
      ethereum: window.ethereum,
      async connect() {
        if (!this.isSupport) {
          throw this.errors.client;
        }
        if (!this.isEnabled) {
          throw this.errors.notEnabled;
        }
        return await this.getAccounts();
      },
      async getAccounts() {
        return await this.ethereumRequest(this.methods.requestAccounts);
      },
      async ethereumRequest(method) {
        return await this.ethereum.request({ method });
      },
      async selectedAccount() {
        return await this.ethereum.selectedAddress;
      },
    };
  });
};
