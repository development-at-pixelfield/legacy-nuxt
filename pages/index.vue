<template>
  <div class="landing-wrapper">
    <main>
      <ComingSoon />

      <BecomeTester />

      <NftsUnique />

      <Blog />

      <Faq />

      <Discover />

      <LandingFooter />
    </main>
  </div>
</template>

<script>
import NftsUnique from "../components/landing/NftsUnique";
import Discover from "../components/landing/Discover";
import BecomeTester from "../components/landing/BecomeTester";
import ComingSoon from "../components/landing/ComingSoon";
import LandingFooter from "../components/footer/LandingFooter";
import Blog from "../components/landing/Blog";
import Faq from "../components/landing/Faq";
export default {
  components: {
    Faq,
    NftsUnique,
    LandingFooter,
    Discover,
    BecomeTester,
    ComingSoon,
    Blog,
  },
  layout: "landing",
  middleware: ["isLoggedIn"],
};
</script>

<style lang="scss" scoped>
@import "assets/scss/pages/landing";
</style>
