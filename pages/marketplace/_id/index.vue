<template>
  <div class="marketplace-detail">
    <div class="header">
      <div class="main-container">
        <Navigation
          :title="$t('marketplace.marketplace')"
          :custom-link="'/marketplace'"
          class="nav"
        />
        <div class="img-block">
          <img src="~/assets/img/bear-head.svg" alt="detail-image" />
        </div>
      </div>
    </div>

    <div class="main-container">
      <div class="detail">
        <h1 class="mb-8 mt-0 detail-title">Alnilam</h1>
        <div class="finance">
          <span class="header-title">107.50Ξ</span>
          <span class="header-title ml-16">est. $314.64K</span>
        </div>

        <div class="content">
          <div class="header-title">{{ $t("marketplace.story") }}</div>
          <p class="mtb text-m">
            It is the 29th-brightest star in the sky (the 4th-brightest in
            Orion) and is a blue supergiant. Together with Mintaka and Alnitak,
            the three stars make up Orion's belt, known by many names across
            many ancient cultures. Alnilam is the middle star. It is slightly
            variable, from magnitude 1.64 to 1.74. Since 1943, the spectrum of
            this star has served as one of the stable anchor points by which
            other stars are classified. It is also one of the 58 stars used in
            celestial navigation. It is at its highest point in the sky around
            midnight on December 15.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from "../../../components/header/Navigation";
export default {
  name: "Index",
  components: {
    Navigation,
  },
  layout: "auth",
  middleware: "auth",
};
</script>

<style lang="scss" scoped>
@import "assets/scss/pages/marketplace-detail";
</style>
