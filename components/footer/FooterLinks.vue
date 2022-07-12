<template>
  <div class="footer-links">
    <a
      target="_blank"
      href="https://storage.googleapis.com/galaxy-nft/VOP_LEGACY.pdf"
      class="no-color-dec-link text-btn"
      >{{ $t("auth.termCond") }}</a
    >
    <a
      target="_blank"
      href="https://storage.googleapis.com/galaxy-nft/Legacy%20Privacy%20Notice.pdf"
      class="no-color-dec-link text-btn"
      >{{ $t("auth.policy") }}</a
    >
  </div>
</template>

<script>
export default {
  name: "FooterLinks",
};
</script>

<style lang="scss" scoped>
@import "assets/scss/components/footer/footer-links";
</style>
