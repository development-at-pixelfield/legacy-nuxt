<template>
  <div class="landing-wrapper">
    <main>
      <ComingSoon />

      <Welcome />

      <BecomeTester />

      <JoinLegacy />

      <JoinUs />

      <Blog />

      <Faq />

      <Discover />

      <LandingFooter />
    </main>
  </div>
</template>

<script>
import Discover from "../components/landing/Discover";
import BecomeTester from "../components/landing/BecomeTester";
import ComingSoon from "../components/landing/ComingSoon";
import LandingFooter from "../components/footer/LandingFooter";
import Blog from "../components/landing/Blog";
import Faq from "../components/landing/Faq";
import JoinLegacy from "../components/landing/JoinLegacy";
import Welcome from "../components/landing/Welcome";
import JoinUs from "../components/landing/JoinUs";
export default {
  components: {
    Faq,
    JoinLegacy,
    LandingFooter,
    Discover,
    BecomeTester,
    ComingSoon,
    Blog,
    Welcome,
    JoinUs,
  },
  layout: "landing",
  middleware: ["isLoggedIn"],
};
</script>

<style lang="scss" scoped>
@import "assets/scss/pages/landing";
</style>
