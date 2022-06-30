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
        <img
          v-for="(icon, index) in icons"
          :key="`icon_${index}`"
          :src="require(`~/assets/img/icons/socials/${icon}.svg`)"
          alt=""
          class="icon"
          @click="handle(icon)"
        />
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
  data() {
    return {
      icons: ["discord", "facebook", "instagram"],
    };
  },
  methods: {
    handle(icon) {
      // TODO implement icon links
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/components/landing/join-us";
</style>
