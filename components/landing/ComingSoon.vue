<template>
  <div class="coming-soon">
    <LandingHeader />

    <div class="content full-container">
      <span>
        <img src="~/assets/img/landing/bear-front.svg" alt="header-logo" />
      </span>
      <h1>Own a piece of Galaxy through Diamond-backed NFT</h1>
      <div class="action">
        <Button
          :label="$t('landing.learnMore')"
          :background="'primary'"
          :size="'medium'"
          :color="'c-white'"
        />
      </div>
    </div>
  </div>
</template>

<script>
import LandingHeader from "../header/LandingHeader";
import Button from "../ui/Button";
export default {
  name: "ComingSoon",
  components: {
    LandingHeader,
    Button,
  },
  methods: {
    anchor() {
      console.log("fsfs");
      document.location = "#become-tester";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/components/landing/coming-soon";
</style>
