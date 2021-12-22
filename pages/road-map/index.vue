<template>
  <div class="road-map-wrapper main-container">
    <Navigation
      :title="$t('marketplace.galacticMiles')"
      class="mb-8"
      :show-back="$auth.loggedIn"
    />

    <div class="header-block mb-40">
      <div class="left-side">
        <h1 class="no-color-link mt-0 mb-16 header-big-l">
          {{ $t("roadmap.roadmap") }}
        </h1>
        <p class="text-m no-color-link desc">{{ $t("roadmap.roadmapDesc") }}</p>
      </div>

      <div class="right-side">
        <img
          :src="require(`assets/img/small-gift.png`)"
          class="user-tag-gift"
          alt="icon"
        />
        <span class="text-m-bold user-tag-text">4 GM (4 votes)</span>
      </div>
    </div>

    <div class="content">
      <RoadmapItem :status="'new'" @add-count="addCount">
        <span slot="count" class="header-title1 no-color-link">22</span>
        <p slot="title" class="mt-0 mb-4 no-color-link text-m-bold">Title</p>
        <p slot="description" class="mtb no-color-link text-m">
          when an unknown printer took a galley of type and scrambled it to make
          a type specimen book. It has survived not only five centuries, but
          also the leap into electronic typesetting, remaining essentially
        </p>
      </RoadmapItem>

      <RoadmapItem :status="'progress'">
        <span slot="count" class="header-title1 no-color-link">22</span>
        <p slot="title" class="mt-0 mb-4 no-color-link text-m-bold">Title</p>
        <p slot="description" class="mtb no-color-link text-m">
          when an unknown printer took a galley of type and scrambled it to make
          a type specimen book. It has survived not only five centuries, but
          also the leap into electronic typesetting, remaining essentially
        </p>
      </RoadmapItem>

      <RoadmapItem :status="'completed'">
        <span slot="count" class="header-title1 no-color-link">22</span>
        <p slot="title" class="mt-0 mb-4 no-color-link text-m-bold">Title</p>
        <p slot="description" class="mtb no-color-link text-m">
          when an unknown printer took a galley of type and scrambled it to make
          a type specimen book. It has survived not only five centuries, but
          also the leap into electronic typesetting, remaining essentially
        </p>
      </RoadmapItem>
    </div>
  </div>
</template>

<script>
import Navigation from "../../components/header/Navigation";
import RoadmapItem from "../../components/marketplace/RoadmapItem";
export default {
  name: "Index",
  components: {
    Navigation,
    RoadmapItem,
  },
  layout(context) {
    if (context.$auth.$state.user) {
      return "auth";
    }
  },
  methods: {
    addCount() {
      const count = 0;
      if (!count) {
        return this.$store.commit("setModal", {
          show: true,
          type: "galactic-miles",
        });
      }

      if (!this.$auth.loggedIn) return this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/pages/road-map";
</style>
