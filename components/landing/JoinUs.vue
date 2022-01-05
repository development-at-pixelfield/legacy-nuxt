<template>
  <div class="welcome-wrapper">
    <div class="content full-container">
      <div class="left-side">
        <h2 class="header-h no-color-link">
          {{ $t("landing.joinTitle1") }}
        </h2>

        <p class="sub-title no-color-link">
          {{ $t("landing.joinDesc1") }}
        </p>

        <div class="action mt-16 display-f">
          <a
            href="https://discord.com/invite/galaxydiamonds"
            class="discord-btn no-color-dec-link text-m-bold"
            target="_blank"
          >
            {{ $t("landing.joinBtn1") }}
          </a>
        </div>
      </div>

      <div class="right-side">
        <span class="img-block">
          <img src="~/assets/img/landing/frame.png" alt="texture" />
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
@import "assets/scss/components/landing/join-us";
</style>
