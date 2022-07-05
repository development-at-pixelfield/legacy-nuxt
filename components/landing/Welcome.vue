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
          <div class="card" :class="{ card_flipped: flipped }">
            <img
              class="card-front"
              src="~/assets/img/flip-front.png"
              alt="texture"
            />
            <img
              class="card-back"
              src="~/assets/img/flip-back.png"
              alt="texture"
            />
          </div>
        </span>
        <Button
          class="flip-action"
          :label="$t('landing.flip')"
          :background="'dark'"
          @on-click="flipped = !flipped"
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
  components: { Button },
  data() {
    return {
      flipped: false,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/components/landing/welcome";
</style>
