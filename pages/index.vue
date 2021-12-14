<template>
  <div class="landing-wrapper">
    <main>
      <ComingSoon />

      <JoinUs />

      <Discover />

      <Interactive />

      <RoadMap />

      <BecomeTester />

      <TextSection />

      <OurTeam />
    </main>
  </div>
</template>

<script>
import JoinUs from "../components/landing/JoinUs";
import Discover from "../components/landing/Discover";
import BecomeTester from "../components/landing/BecomeTester";
import OurTeam from "../components/landing/OurTeam";
import ComingSoon from "../components/landing/ComingSoon";
import RoadMap from "../components/landing/RoadMap";
import Interactive from "../components/landing/Interactive";
import TextSection from "../components/landing/TextSection";
export default {
  components: {
    Interactive,
    RoadMap,
    JoinUs,
    Discover,
    BecomeTester,
    ComingSoon,
    OurTeam,
    TextSection,
  },
  layout: "landing",
  middleware: ["isLoggedIn"],
  created() {
    console.log("last version");
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/pages/landing";
</style>
