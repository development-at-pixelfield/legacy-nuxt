<template>
  <div id="road-map" class="road-map">
    <h2 class="text-xl mt-0">{{ $t("landing.ourRoadMap") }}</h2>
    <p class="mtb text-l text-center" v-html="$t('landing.roadDesc')"></p>

    <div class="content">
      <div class="row two-column">
        <div class="left-side">
          <div class="star">
            <img src="~/assets/img/landing/star-shine.svg" alt="" />
          </div>
          <div class="star-info">
            <span class="star-text done">Public launch</span>
            <span class="check-block"
              ><img src="~/assets/img/landing/success-check.svg" alt="check"
            /></span>
          </div>
        </div>

        <div class="left-side">
          <div class="star">
            <img src="~/assets/img/landing/star-shine.svg" alt="" />
          </div>
          <div class="star-info">
            <span class="star-text done">Public launch</span>
            <span class="check-block"
              ><img src="~/assets/img/landing/success-check.svg" alt="check"
            /></span>
          </div>
        </div>
      </div>

      <div class="row one-column">
        <div class="center-side">
          <div class="circle">
            <img src="~/assets/img/landing/big-circle-shine.svg" alt="" />
          </div>
          <div class="star-info">
            <span class="star-text progress">Public launch (50%)</span>
          </div>
        </div>
      </div>

      <div class="row two-column">
        <div class="left-side">
          <div class="circle">
            <img src="~/assets/img/landing/small-circle-shine.svg" alt="" />
          </div>
          <div class="star-info">
            <span class="star-text to-do">Public launch (0%)</span>
          </div>
        </div>

        <div class="left-side">
          <div class="circle">
            <img src="~/assets/img/landing/small-circle-shine.svg" alt="" />
          </div>
          <div class="star-info">
            <span class="star-text to-do">Public launch (0%)</span>
          </div>
        </div>
      </div>

      <div class="row one-column">
        <div class="center-side">
          <div class="circle">
            <img src="~/assets/img/landing/small-circle-shine.svg" alt="" />
          </div>
          <div class="star-info">
            <span class="star-text to-do">Public launch (0%)</span>
          </div>
        </div>
      </div>

      <div class="big-star-container">
        <p class="mt-0 mb-16">
          <img
            src="~/assets/img/landing/big-star.svg"
            alt="star"
            class="big-star"
          />
        </p>
        <p class="mt-0 mb-4 text-s-bold">{{ $t("landing.ourGoal") }}</p>
        <p class="trip">{{ $t("landing.trip") }}</p>
      </div>

      <span class="rocket">
        <img src="~/assets/img/landing/rocket.svg" alt="rocket" />
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "RoadMap",
};
</script>

<style lang="scss" scoped>
@import "assets/scss/components/landing/road-map";
</style>
