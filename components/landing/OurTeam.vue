<template>
  <div id="our-team" class="our-team">
    <div class="map-wrapper">
      <div class="content">
        <h2 class="text-xl mt-0">{{ $t("landing.ourTeam") }}</h2>
        <p class="mtb text-l text-center">{{ $t("landing.teamDesc") }}</p>

        <div class="teams">
          <div class="team mb-8 yellow">
            <div class="team-info">
              <p class="position mt-0 mb-4">Marketing team</p>
              <p class="text-m mtb">Slovakia</p>
            </div>
            <div class="country">
              <img
                src="~/assets/img/landing/flag.svg"
                alt="flag"
                class="flag"
              />
            </div>
          </div>

          <div class="team mb-8 purple">
            <div class="team-info">
              <p class="position mt-0 mb-4">Marketing team</p>
              <p class="text-m mtb">Slovakia</p>
            </div>
            <div class="country">
              <img
                src="~/assets/img/landing/flag.svg"
                alt="flag"
                class="flag"
              />
            </div>
          </div>

          <div class="team mb-8 light-blue">
            <div class="team-info">
              <p class="position mt-0 mb-4">Marketing team</p>
              <p class="text-m mtb">Slovakia</p>
            </div>
            <div class="country">
              <img
                src="~/assets/img/landing/flag.svg"
                alt="flag"
                class="flag"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OurTeam",
};
</script>

<style lang="scss" scoped>
@import "assets/scss/components/landing/our-team";
</style>
