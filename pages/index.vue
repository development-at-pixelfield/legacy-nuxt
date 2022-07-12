<template>
  <div class="landing-wrapper">
    <span class="back-img"></span>

    <main>
      <LandingHeader />

      <ComingSoon />

      <Welcome id="more_info" />

      <WhoFind />

      <PurchaseBenefits />

      <BecomeTester
        v-if="feed.collections"
        :collections="feed.collections.slice(0, 3)"
      />

      <HowItWorks />

      <JoinUs />

      <Newsletter />

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
import Welcome from "../components/landing/Welcome";
import JoinUs from "../components/landing/JoinUs";
import LandingHeader from "../components/header/LandingHeader";
import WhoFind from "../components/landing/WhoCanYouFind.vue";
import PurchaseBenefits from "../components/landing/PurchaseBenefits.vue";
import HowItWorks from "../components/landing/HowItWorks.vue";
import Newsletter from "../components/landing/Newsletter.vue";
export default {
  components: {
    Faq,
    LandingFooter,
    Discover,
    // eslint-disable-next-line vue/no-unused-components
    BecomeTester,
    WhoFind,
    ComingSoon,
    PurchaseBenefits,
    Blog,
    HowItWorks,
    Welcome,
    Newsletter,
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
