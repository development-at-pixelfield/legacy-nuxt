<template>
  <transition v-if="modal.show" name="modal" :duration="333" mode="out-in">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <DeleteAccount v-if="modal.type === 'delete-account'" @close="close" />
        <StarInfo v-if="modal.type === 'star-info'" @close="close" />
        <VerifyIdentityModal
          v-if="modal.type === 'verification-required'"
          @close="close"
        />
        <CheckoutModal
          v-if="modal.type === 'checkout'"
          @close="close"
        ></CheckoutModal>
        <ConnectMetamask
          v-if="modal.type === 'checkout-metamask'"
          @close="close"
        ></ConnectMetamask>
        <ConnectWallet
          v-if="modal.type === 'checkout-wallet'"
          @close="close"
        ></ConnectWallet>
        <PurchaseModal
          v-if="modal.type === 'purchase'"
          @close="close"
        ></PurchaseModal>
        <PayCard v-if="modal.type === 'pay-card'" @close="close"></PayCard>
      </div>
    </div>
  </transition>
</template>

<script>
import DeleteAccount from "./DeleteAccount";
import StarInfo from "./StarInfo";
import VerifyIdentityModal from "./nft/VerifyIdentity";
import CheckoutModal from "./nft/CheckoutModal";
import ConnectMetamask from "./nft/ConnectMetamask";
import ConnectWallet from "./nft/ConnectWallet";
import PurchaseModal from "./nft/PurchaseModal";
import PayCard from "./nft/PayCard";
export default {
  name: "Modals",
  components: {
    DeleteAccount,
    StarInfo,
    VerifyIdentityModal,
    CheckoutModal,
    ConnectMetamask,
    ConnectWallet,
    PurchaseModal,
    PayCard,
  },
  computed: {
    modal() {
      return this.$store.getters.modal;
    },
  },

  methods: {
    close(name) {
      console.log("name", name, "close modal");
      this.$store.commit("setModal", {
        show: false,
        type: null,
        data: null,
        close: name || "",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/modals/index";
</style>
