<template>
  <ScaffoldModal :heading="$t('nft_modal.connect_wallet')" @close="close">
    <div
      v-for="(wallet, index) in wallets"
      :key="`wallet_${index}`"
      class="modal-container_wallet-item"
      @click="addWallet(wallet)"
    >
      <img :src="wallet.image" />
      <div>{{ wallet.name }}</div>
    </div>
  </ScaffoldModal>
</template>

<script>
import ScaffoldModal from "~/components/modals/nft/ScaffoldModal.vue";
export default {
  name: "NftWalletModal",
  components: {
    ScaffoldModal,
  },
  props: {
    wallets: {
      type: Array,
      required: false,
      default: () => [
        {
          name: "MetaMask",
          image: require("assets/img/icons/metamask-wallet-image.svg"),
        },
      ],
    },
  },
  methods: {
    addWallet(wallet) {
      this.$emit("addWallet", wallet);
    },

    close() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped lang="scss">
@import "~assets/scss/modals/nft/index";
</style>
