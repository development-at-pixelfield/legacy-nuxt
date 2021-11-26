<template>
  <header>
    <div class="desktop-header">
      <ul class="list">
        <li>
          <a href="#discover" class="no-color-dec-link">{{
            $t("landing.discover")
          }}</a>
        </li>
        <li>
          <a href="#road-map" class="no-color-dec-link">{{
            $t("landing.roadmap")
          }}</a>
        </li>
        <li>
          <a href="#become-tester" class="no-color-dec-link">{{
            $t("landing.becomeTester")
          }}</a>
        </li>
        <li>
          <a href="#our-team" class="no-color-dec-link">{{
            $t("landing.ourTeam")
          }}</a>
        </li>
      </ul>

      <div class="logo-block">
        <img src="~/assets/img/desktop-landing-logo.svg" alt="logo" />
      </div>

      <div class="action">
        <Button
          :label="$t('landing.becomeTester')"
          :background="'primary'"
          :size="'small'"
          :color="'c-white'"
        />
      </div>
    </div>

    <div class="mobile-header">
      <div class="logo-block">
        <img src="~/assets/img/desktop-landing-logo.svg" alt="logo" />
      </div>
      <div class="action">
        <Button
          :label="$t('landing.becomeTester')"
          :background="'primary'"
          :size="'small'"
          :color="'c-white'"
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
};
</script>

<style lang="scss" scoped>
@import "assets/scss/components/header/landing-header";
</style>
