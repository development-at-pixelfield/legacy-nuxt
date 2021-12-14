<template>
  <ScaffoldModal :heading="headingText" @close="close">
    <img src="~/assets/img/nft-preview.png" />
    <div v-if="status === 'approval'" class="approving-nft" @click="next">
      {{ $t("nft_modal.confirmFromMetaMask") }}
    </div>
    <div
      v-else-if="status === 'processing'"
      class="processing-nft"
      @click="next"
    >
      <Spinner class="processing_spinner" />
      <div>
        {{ $t("nft_modal.waitingConfirmation") }}
      </div>
    </div>
    <div v-else class="finished-nft"></div>
  </ScaffoldModal>
</template>
<script>
import ScaffoldModal from "~/components/modals/nft/ScaffoldModal.vue";
import Spinner from "~/components/ui/Spinner.vue";
export default {
  name: "NftWalletModal",
  components: {
    ScaffoldModal,
    Spinner,
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
  data() {
    return {
      status: "approval",
    };
  },
  computed: {
    headingText() {
      const config = {
        approval: this.$t("nft_modal.approveForTrading"),
        processing: this.$t("nft_modal.processingPurchase"),
        finished: this.$t("nft_modal.congratulations"),
      };
      return config[this.status];
    },
  },
  methods: {
    next() {
      if (this.status === "approval") {
        this.status = "processing";
      } else if (this.status === "processing") {
        this.status = "finished";
      }
    },
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
@import "~assets/scss/modals/nft/purchase.scss";
</style>
