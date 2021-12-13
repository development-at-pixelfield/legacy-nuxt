<template>
  <div class="coming-soon">
    <LandingHeader />

    <div class="content full-container">
      <span :class="{ show: show }">
        <img src="~/assets/img/landing/Bear_front.png" alt="header-logo" />
      </span>
      <h1 :class="{ show: show1 }">
        Own a piece of Galaxy through Diamond-backed NFT
      </h1>
      <div class="action" :class="{ show: show2 }">
        <Button
          :label="$t('landing.learnMore')"
          :background="'primary'"
          :size="'medium'"
          :color="'c-white'"
          @on-click="anchorLink"
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
  data() {
    return {
      show: false,
      show1: false,
      show2: false,
    };
  },
  mounted() {
    const vm = this;

    setTimeout(function () {
      vm.show = true;
    }, 1000);

    setTimeout(function () {
      vm.show1 = true;
    }, 1250);

    setTimeout(function () {
      vm.show2 = true;
    }, 1500);
  },
  methods: {
    anchorLink() {
      document.location = "#discover";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/components/landing/coming-soon";
</style>
