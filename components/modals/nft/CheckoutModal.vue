<template>
  <ScaffoldModal :heading="$t('nft_modal.checkout')" @close="close">
    <div class="buying-header">
      {{ $t("nft_modal.you_are_buying") }} <strong>{{ nft.name }}</strong>
    </div>
    <div class="divider" />
    <div class="summary">
      <div>{{ $t("nft_modal.total") }}</div>
      <div>
        <div class="summary_heading">{{ nft.price_eth }}</div>
        <div class="summary_sub-heading">{{ nft.price_usd }}</div>
      </div>
    </div>
    <div class="divider" />
    <Checkbox :name.sync="agree" class="mb-32 terms" :error="checkError">
      <label slot="label" class="text-m">
        {{ $t("auth.agreeWith") }} &nbsp;
        <nuxt-link to="/" class="no-color-link">{{
          $t("auth.termCond")
        }}</nuxt-link>
      </label>
    </Checkbox>
    <div class="button-wrap">
      <Button
        :background="'ghost'"
        :size="'medium'"
        :color="'c-white'"
        :label="$t('nft_modal.addFunds')"
        @on-click="addFunds"
        ><span slot="left_icon" class="icon-button"
          ><img src="~/assets/img/icons/credit-card.svg" /></span
      ></Button>
      <Button
        :background="userHasEnoughFunds ? 'primary' : 'default'"
        :size="'medium'"
        :color="'c-white'"
        :disabled="!userHasEnoughFunds"
        :label="canPurchaseText"
        @on-click="purchaseNft"
        ><span v-if="userHasEnoughFunds" slot="left_icon" class="icon-button"
          ><img src="~/assets/img/icons/wallet.svg" /></span
      ></Button>
    </div>
    <div
      class="current-balance"
      :class="
        userHasEnoughFunds
          ? 'current-balance_positive'
          : 'current-balance_negative'
      "
    >
      {{ $t("nft_modal.availableBalance") }} {{ userBalance }}Ξ ($2.013.000)
    </div>
  </ScaffoldModal>
</template>

<script>
import Checkbox from "../../../components/ui/Checkbox";
import Button from "../../ui/Button";
import ScaffoldModal from "~/components/modals/nft/ScaffoldModal.vue";

export default {
  name: "NftCheckoutModal",
  components: {
    ScaffoldModal,
    Checkbox,
    Button,
  },
  props: {
    nft: {
      type: Object,
      required: true,
      default: () => ({
        name: "Example NFT",
        price_eth: "107.50Ξ",
        price_usd: "($314.643)",
      }),
    },
  },
  data() {
    return {
      agree: false,
      checkError: "",
      // TODO here add the balance of the user, currenlty not implemented yet
      userBalance: 500.41,
    };
  },
  computed: {
    canPurchaseText() {
      return this.userHasEnoughFunds
        ? `${this.$t("nft_modal.pay")} ${this.nft.price_eth}`
        : this.$t("nft_modal.noFunds");
    },
    userHasEnoughFunds() {
      // TODO implement user hvaing enough funds
      return false;
    },
  },
  methods: {
    addFunds() {
      this.$emit("addFunds");
    },
    purchaseNft() {
      if (!this.agree) {
        this.checkError = this.$t("validations.termAgree");
        return false;
      }
      this.$emit("purchaseNFT", this.nft);
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped lang="scss">
@import "~assets/scss/modals/nft/checkout";
</style>
