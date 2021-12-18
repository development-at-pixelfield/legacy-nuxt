import Web3 from "web3";
export default ({ app }, inject) => {
  inject("metamask", () => {
    return {
      errors: {
        client: "This plugin can be used only in client mode render",
        notEnabled: "Metamask is not installed",
      },
      methods: {
        requestAccounts: "eth_requestAccounts",
        requestBalance: "eth_requestAccounts",
      },
      isSupport: process.client && window,
      isEnabled: typeof window.ethereum !== "undefined",
      ethereum: window.ethereum,
      web3: new Web3(window.ethereum),
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
      /**
       * Get current user balance
       * @param address – wallet address
       * @returns {Promise<string>}
       */
      async getBalance(address) {
        return await this.web3.eth.getBalance(address);
      },
      /**
       * Convert to wei from eth
       * @param eth
       * @returns {string}
       */
      fromWeiToEth(eth) {
        return this.web3.utils.fromWei(eth);
      },
      /**
       * Convert to ether
       * @param wei
       * @returns {BN}
       */
      fromEthToWei(wei) {
        return this.web3.utils.toWei(wei, "ether");
      },
      /**
       * Execute payment
       * @param tokenContract
       * @param nftTokenId
       * @param methodType
       * @returns {Promise<void>}
       */
      async payNFT(tokenContract, nftTokenId, methodType) {
        const contractJSON = require("./NftTrader.json");
        const userAccount = await this.selectedAccount();
        await window.web3.currentProvider.enable();
        console.log(userAccount);
        console.log(window.web3.currentProvider);
        const contract = new this.web3.eth.Contract(
          contractJSON.abi,
          process.env.TRADE_CONTRACT_ADDRESS
        );
        contract.defaultChain = "goerli";
        console.log(contract.defaultChain);
        // console.log(contract.getProvider);
        if (methodType === "timed") {
          const result = await contract.methods
            .timedPurchase(tokenContract, nftTokenId)
            .call({ from: userAccount });
          console.log(result);
        }
        if (methodType === "constant") {
        }
        // const contractInstance = this.web3.eth
        //   .Contract(contractJSON.abi)
        //   .at(tokenContract);
        console.log(methodType);
        console.log(contract);
        console.log(contractJSON);
        // https://ethereum.stackexchange.com/questions/25431/metamask-how-to-access-call-deployed-contracts-functions-using-metamask
      },
    };
  });
};
