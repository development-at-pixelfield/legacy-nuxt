<template>
  <transition v-if="modal.show" name="modal" :duration="333" mode="out-in">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <InfoVerification
          v-if="modal.type === 'info-verification'"
          @close="close"
        />
        <VerifyId v-if="modal.type === 'verify-id'" @close="close" />
        <DeleteAccount v-if="modal.type === 'delete-account'" @close="close" />
        <StarInfo v-if="modal.type === 'star-info'" @close="close" />
      </div>
    </div>
  </transition>
</template>

<script>
import DeleteAccount from "./DeleteAccount";
import StarInfo from "./StarInfo";
import VerifyId from "./nft/VerifyId";
import InfoVerification from "./nft/InfoVerification";
export default {
  name: "Modals",
  components: {
    DeleteAccount,
    StarInfo,
    VerifyId,
    InfoVerification,
  },
  computed: {
    modal() {
      return this.$store.getters.modal;
    },
  },

  methods: {
    close(name) {
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
