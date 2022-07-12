<template>
  <div id="learn-more" class="discover-wrapper">
    <div class="discover">
      <div class="full-container">
        <div class="left-side">
          <h2 class="mt-0 no-color-link">
            {{ $t("landing.discoverTitle") }}
          </h2>
          <p class="mb-0 text-m" v-html="$t('landing.discoverDesc')"></p>
        </div>
        <div class="right-side">
          <span class="img-block">
            <img
              class="bear-img"
              src="~/assets/img/landing/dic-logo.png"
              alt="discover"
            />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Discover",
};
</script>

<style lang="scss" scoped>
@import "assets/scss/components/landing/discover";
</style>
