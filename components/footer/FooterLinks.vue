<template>
  <div class="footer-links">
    <nuxt-link to="/term-cond" class="no-color-dec-link text-btn">{{
      $t("auth.termCond")
    }}</nuxt-link>
    <nuxt-link to="/privacy-policy" class="no-color-dec-link text-btn">{{
      $t("auth.policy")
    }}</nuxt-link>
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
