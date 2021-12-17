<template>
  <ScaffoldModal
    :heading="$t('nft_modal.verifyIdentity')"
    @close="handle('close')"
  >
    <div class="verification-container">
      <img src="~/assets/img/icons/verification-symbol.svg" />
      <div class="verification-container_textbox">
        <div class="verification-container_textbox_title">
          {{ $t("nft_modal.verifyIdentity") }}
        </div>
        <div class="verification-container_textbox_desc">
          {{ $t("nft_modal.verificationText") }}
        </div>
        <Button
          :size="'full'"
          :color="'c-white'"
          :label="$t('nft_modal.startVerification')"
          @on-click="handle('startVerification')"
        />
      </div>
    </div>
  </ScaffoldModal>
</template>

<script>
import Button from "../../ui/Button";
import ScaffoldModal from "~/components/modals/nft/ScaffoldModal.vue";

export default {
  name: "VerifyIdentityModal",
  components: {
    Button,
    ScaffoldModal,
  },
  methods: {
    handle(emit) {
      this.$emit(emit);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/modals/nft/verification";
</style>
