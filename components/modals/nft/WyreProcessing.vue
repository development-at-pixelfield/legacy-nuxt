<template>
  <ScaffoldModal :heading="$t('nft_modal.wyre.loading')" @close="close()">
    <div class="modal-content">
      <div class="heading">{{ $t("nft_modal.wyre.processing") }}</div>
      <Spinner />
    </div>
  </ScaffoldModal>
</template>

<script>
import ScaffoldModal from "~/components/modals/nft/ScaffoldModal.vue";
import Spinner from "~/components/ui/Spinner.vue";

export default {
  name: "WyreProcessingModal",
  components: {
    ScaffoldModal,
    Spinner,
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/modals/nft/wyre-processing";
</style>
