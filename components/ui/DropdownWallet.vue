<template>
  <div class="dropdown-list-wrapper">
    <div class="label-block" @click="openDropdown">
      <span class="drop-img-block view-wallet">
        <img src="~/assets/img/icons/wallet.svg" alt="wallet" />
        <span class="drop-img-block-state view-offline"></span>
      </span>
    </div>
    <div v-if="show">
      <div v-if="hasWallet" class="dropdown-wallet">
        <p class="text-s-bold mb-16 mt-0">
          {{ $t("modals.wallet") }}
          <span class="dropdown-wallet-close" @click="openDropdown">
            <img src="~/assets/img/icons/close-modal.svg" alt="close" />
          </span>
        </p>
        <p class="text-m-bold mb-16 mt-0">{{ $t("modals.walletStatus") }}</p>
        <div class="dropdown-wallet-connect mb-24 view-active">
          <div class="dropdown-wallet-connect-state">
            <span class="dropdown-wallet-connect-state-circle"></span>
          </div>
          <div class="dropdown-wallet-connect-text">
            <p class="text-m-bold mb-0 mt-0">{{ $t("modals.walletActive") }}</p>
          </div>
          <div class="dropdown-wallet-connect-button view-disconnect text-btn">
            {{ $t("modals.disconnect") }}
          </div>
        </div>
        <p class="text-m-bold mb-16 mt-0">{{ $t("modals.walletId") }}</p>
        <div class="dropdown-wallet-connect mb-24 view-active">
          <div class="dropdown-wallet-connect-text view-link">
            <p class="text-m mb-0 mt-0">0xc55ba...d1f6c77</p>
          </div>
          <div class="dropdown-wallet-connect-button view-icon text-btn">
            <img src="~/assets/img/icons/clipboard.svg" alt="clipboard" />
          </div>
        </div>
        <p class="text-m-bold mb-16 mt-0">{{ $t("modals.walletLinks") }}</p>
        <div class="dropdown-wallet-connect mb-16 view-active">
          <div class="dropdown-wallet-connect-text view-nopadding">
            <p class="text-m-bold mb-0 mt-0">How to connect wallet</p>
          </div>
          <div class="dropdown-wallet-connect-button view-icon text-btn">
            <img src="~/assets/img/icons/caret-right.svg" alt="link" />
          </div>
        </div>
        <div class="dropdown-wallet-connect view-active">
          <div class="dropdown-wallet-connect-text view-nopadding">
            <p class="text-m-bold mb-0 mt-0">How to buy ETH</p>
          </div>
          <div class="dropdown-wallet-connect-button view-icon text-btn">
            <img src="~/assets/img/icons/caret-right.svg" alt="link" />
          </div>
        </div>
      </div>
      <div v-else class="dropdown-wallet">
        <p class="text-s-bold mb-16 mt-0">
          {{ $t("modals.walletNot") }}
          <span class="dropdown-wallet-close" @click="openDropdown">
            <img src="~/assets/img/icons/close-modal.svg" alt="close" />
          </span>
        </p>
        <div class="dropdown-wallet-connect mb-16">
          <div class="dropdown-wallet-connect-image">
            <img
              src="~/assets/img/icons/metamask-wallet-image.svg"
              alt="wallet"
            />
          </div>
          <div class="dropdown-wallet-connect-text">
            <p class="text-m-bold mb-0 mt-0">MetaMask</p>
          </div>
          <div class="dropdown-wallet-connect-button text-btn">
            {{ $t("modals.connect") }}
          </div>
        </div>
        <div class="dropdown-wallet-connect-info">
          <p class="text-m-bold mb-4 mt-0">
            {{ $t("modals.walletInfoTitle") }}
          </p>
          <p class="text-s mb-24 mt-0">
            {{ $t("modals.walletInfo") }}
          </p>
          <Button
            class="primary-btn full-width"
            :background="'primary'"
            :size="'small'"
            :color="'c-white'"
            :label="$t('modals.walletMore')"
            @on-click="$router.push('/settings')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "../../components/ui/Button";
export default {
  name: "DropdownWallet",
  components: {
    Button,
  },
  props: {
    indexNumber: {
      type: Number,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      show: false,
      hasWallet: true,
    };
  },
  watch: {
    $route(val) {
      this.show = false;
    },
  },
  mounted() {
    document.addEventListener("click", this.close);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.close);
  },
  methods: {
    openDropdown() {
      this.show = !this.show;
    },
    close(e) {
      if (!this.$el.contains(e.target)) {
        this.show = false;
      }
    },
    actionHandler(item) {
      this.$emit("action", item, this.indexNumber);
      this.show = false;
    },
    toLink(link) {
      this.$router.push(link);
      this.show = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/ui/dropdown-list";
</style>
