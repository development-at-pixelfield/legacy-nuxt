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
    <div v-else class="finished-nft">
      <div>
        {{ $t("nft_modal.ownerOf") }}
        <span class="finished-nft_special-text">{{ nft.name }}</span>
      </div>
      <div>
        {{ $t("nft_modal.transactionHash") }}:
        <span class="finished-nft_special-text tooltip" @click="copyToClip"
          >{{ refinedHash
          }}<span class="tooltiptext">{{ nft.hash }}</span></span
        >
      </div>
      <Button
        :size="'full'"
        :color="'c-white'"
        :label="`View your NFT`"
        @on-click="addFunds"
      />
    </div>
  </ScaffoldModal>
</template>
<script>
import Button from "../../ui/Button";
import { functions } from "../../../utils";
import ScaffoldModal from "~/components/modals/nft/ScaffoldModal.vue";
import Spinner from "~/components/ui/Spinner.vue";

export default {
  name: "NftWalletModal",
  components: {
    ScaffoldModal,
    Spinner,
    Button,
  },
  props: {
    nft: {
      type: Object,
      required: true,
      default: () => ({
        name: "Example NFT",
        hash: "0xB90A2fEBB4333f0c86F6785bB23460eb4544F49c",
      }),
    },
  },
  data() {
    return {
      status: "approval",
    };
  },
  computed: {
    refinedHash() {
      return functions.refineHash(this.nft.hash);
    },
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
    async copyToClip() {
      const copyText = this.nft.hash;
      navigator.clipboard.writeText(copyText);
      await this.$store.commit("setSnackbar", {
        show: true,
        message: this.$t("nft_modal.copiedToClip"),
        color: "success",
      });
    },
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
