<template>
  <div class="welcome-wrapper">
    <div class="content full-container">
      <div class="left-side">
        <h2 class="header-h no-color-link">
          {{ $t("landing.welcomeTitle") }}
        </h2>

        <p class="mtb desc text-m-bold no-color-link">
          {{ $t("landing.welcomeDesc") }}
        </p>
      </div>

      <div class="right-side">
        <span class="img-block">
          <img src="~/assets/img/landing/welcome-image.png" alt="texture" />
        </span>
        <Button
          class="flip-action"
          :label="$t('landing.flip')"
          :background="'dark'"
          ><span slot="left-icon"
            ><img class="b-icon" src="~/assets/img/icons/flip.svg" /></span
        ></Button>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "~/components/ui/Button.vue";
export default {
  name: "Welcome",
  components: [Button],
};
</script>

<style lang="scss" scoped>
@import "assets/scss/components/landing/welcome";
</style>
