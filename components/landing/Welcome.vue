<template>
  <div class="welcome-wrapper">
    <div class="content full-container">
      <div class="left-side">
        <h2 class="header-h no-color-link">
          {{ $t("landing.welcomeTitle") }}
        </h2>

        <p class="sub-title no-color-link">
          {{ $t("landing.welcomeSubTitle") }}
        </p>

        <p class="mtb desc text-m no-color-link">
          {{ $t("landing.welcomeDesc") }}
        </p>
      </div>

      <div class="right-side">
        <span class="img-block">
          <img src="~/assets/img/landing/nft-texture.png" alt="texture" />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Welcome",
};
</script>

<style lang="scss" scoped>
@import "assets/scss/components/landing/welcome";
</style>
