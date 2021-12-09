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
      isSupport: process.client,
      isEnabled: typeof window.ethereum !== "undefined",
      ethereum: window.ethereum,
      init: () => {
        return {
          supported: this.isSupport,
          isEnabled: this.isEnabled,
        };
      },
      connect: async () => {
        if (!this.isSupport) {
          throw this.errors.client;
        }
        if (!this.isEnabled) {
          throw this.errors.notEnabled;
        }
        return await this.getAccounts();
      },
      getAccounts: async () => {
        return await this.ethereumRequest(this.methods.requestAccounts);
      },
      ethereumRequest: async (method) => {
        await this.ethereum.request({ method });
      },
    };
  });
};
