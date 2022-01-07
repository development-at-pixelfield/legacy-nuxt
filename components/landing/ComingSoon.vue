<template>
  <div class="coming-soon">
    <div class="content full-container">
      <h1 :class="{ show: show1 }">
        {{ $t("landing.mainTitle") }}
      </h1>
      <p class="mt-0 mb-0 no-color-link desc" :class="{ show: show3 }">
        {{ $t("landing.mainDesc") }}
      </p>
      <div class="action" :class="{ show: show2 }">
        <Button
          :label="$t('landing.registerNow')"
          :background="'primary'"
          :size="'medium'"
          :color="'c-white'"
          @on-click="anchorLink"
        />
      </div>
      <span :class="{ show: show }" class="web-span">
        <img
          id="header-logo"
          src="~/assets/img/landing/nfts.png"
          alt="header-logo"
          @load="isLoaded = true"
        />
      </span>
    </div>
  </div>
</template>

<script>
import Button from "../ui/Button";
export default {
  name: "ComingSoon",
  components: {
    Button,
  },
  data() {
    return {
      show: false,
      show1: false,
      show2: false,
      show3: false,
      isLoaded: false,
    };
  },
  watch: {
    isLoaded(val) {
      if (val) this.showAnimation();
    },
  },
  methods: {
    anchorLink() {
      this.$router.push("/register");
    },
    showAnimation() {
      const vm = this;

      setTimeout(function () {
        vm.show1 = true;
        vm.show3 = true;
      }, 500);

      setTimeout(function () {
        vm.show2 = true;
      }, 750);

      setTimeout(function () {
        vm.show = true;
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/components/landing/coming-soon";
</style>
