<template>
  <div class="landing-wrapper">
    <span class="back-img"></span>

    <main>
      <LandingHeader />

      <ComingSoon />

      <Welcome />

      <BecomeTester :collections="feed.constellations.slice(0, 3)" />

      <JoinLegacy />

      <JoinUs />

      <Blog :blogs="feed.blogs" />

      <Faq :faqs="feed.faq" />

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
import LandingHeader from "../components/header/LandingHeader";
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
    LandingHeader,
  },
  layout: "landing",
  middleware: ["isLoggedIn"],
  async asyncData({ store }) {
    const feed = await store.dispatch("landing/feed");
    return { feed };
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/pages/landing";
</style>
