<template>
  <div class="landing-wrapper">
    <LandingHeader />

    <main>
      <ComingSoon />

      <JoinUs />

      <Discover />

      <RoadMap />

      <BecomeTester />

      <OurTeam />
    </main>

    <LandingFooter />
  </div>
</template>

<script>
import LandingHeader from "../components/header/LandingHeader";
import JoinUs from "../components/landing/JoinUs";
import Discover from "../components/landing/Discover";
import BecomeTester from "../components/landing/BecomeTester";
import OurTeam from "../components/landing/OurTeam";
import LandingFooter from "../components/footer/LandingFooter";
import ComingSoon from "../components/landing/ComingSoon";
import RoadMap from "../components/landing/RoadMap";
export default {
  components: {
    RoadMap,
    LandingHeader,
    JoinUs,
    Discover,
    BecomeTester,
    ComingSoon,
    OurTeam,
    LandingFooter,
  },
  layout: "landing",
  middleware: ["isLoggedIn"],
};
</script>

<style lang="scss" scoped>
@import "assets/scss/pages/landing";
</style>
