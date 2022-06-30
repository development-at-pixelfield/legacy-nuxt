<template>
  <div class="coming-soon">
    <div class="content full-container">
      <h1 :class="{ show: show1 }">
        {{ $t("landing.mainTitle") }}
      </h1>
      <p class="mt-0 mb-0 no-color-link desc" :class="{ show: show3 }">
        {{ $t("landing.mainDesc") }}
      </p>
      <span :class="{ show: show }" class="web-span">
        <img
          id="header-logo"
          src="~/assets/img/landing/landing-nfts.png"
          alt="header-logo"
          @load="isLoaded = true"
        />
      </span>
      <Button
        :class="{ show: show2 }"
        :label="$t('landing.moreInfo')"
        :background="'dark'"
      />
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
  mounted() {
    if (this.$route.hash.includes("discover")) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      this.anchorLink();
    }
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
