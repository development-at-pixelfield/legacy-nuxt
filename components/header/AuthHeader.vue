<template>
  <div class="auth-header">
    <nuxt-link to="/"><img :src="userAvatar" alt="logo" /></nuxt-link>
  </div>
</template>

<script>
export default {
  name: "AuthHeader",
  computed: {
    userAvatar() {
      return require("~/assets/img/header-logo.svg");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/components/header/auth-header";
</style>
