<template>
  <header>
    <div class="desktop-header full-container">
      <ul class="list">
        <li>
          <a href="#discover" class="no-color-dec-link text-m">{{
            $t("landing.discover")
          }}</a>
        </li>
        <li>
          <a href="#road-map" class="no-color-dec-link text-m">{{
            $t("landing.roadmap")
          }}</a>
        </li>
        <li>
          <a href="#become-tester" class="no-color-dec-link text-m">{{
            $t("landing.becomeTester")
          }}</a>
        </li>
        <li>
          <a href="#our-team" class="no-color-dec-link text-m">{{
            $t("landing.ourTeam")
          }}</a>
        </li>
      </ul>

      <div class="logo-block">
        <nuxt-link to="/" class="link-header">
          <img src="~/assets/img/desktop-landing-logo.svg" alt="logo" />
        </nuxt-link>
      </div>

      <div class="action">
        <Button
          :label="$t('landing.becomeTester')"
          :background="'primary'"
          :size="'small'"
          :color="'c-white'"
          @on-click="anchorLink"
        />
      </div>
    </div>

    <div class="mobile-header">
      <div class="logo-block">
        <nuxt-link to="/" class="link-header">
          <img src="~/assets/img/desktop-landing-logo.svg" alt="logo" />
        </nuxt-link>
      </div>
      <div class="action">
        <Button
          :label="$t('landing.becomeTester')"
          :background="'primary'"
          :size="'small'"
          :color="'c-white'"
          @on-click="anchorLink"
        />
      </div>
    </div>
  </header>
</template>

<script>
import Button from "../ui/Button";
export default {
  name: "LandingHeader",
  components: {
    Button,
  },
  methods: {
    anchorLink() {
      document.location = "#become-tester";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/components/header/landing-header";
</style>
