<template>
  <div class="auth-header">
    <img :src="userAvatar" alt="logo" @click="toLink" />
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
  methods: {
    toLink() {
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/components/header/auth-header";
</style>
