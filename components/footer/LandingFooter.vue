<template>
  <footer>
    <div class="full-container">
      <div class="content">
        <div class="img-block display-f">
          <img src="~/assets/img/header-logo.svg" alt="footer-logo" />
        </div>

        <ul>
          <li>
            <nuxt-link
              to="/marketplace"
              class="text-m-bold no-color-dec-link"
              >{{ $t("marketplace.marketplace") }}</nuxt-link
            >
          </li>
          <li>
            <nuxt-link
              to="/legacy-scores"
              class="text-m-bold no-color-dec-link"
              >{{ $t("marketplace.legacyScores") }}</nuxt-link
            >
          </li>
          <li>
            <nuxt-link to="/help" class="text-m-bold no-color-dec-link">
              {{ $t("marketplace.help") }}
            </nuxt-link>
          </li>
          <li>
            <a
              target="_blank"
              href="https://storage.googleapis.com/pfld-outdoor-production-documents-bucket/ISIAjobs_Terms_and_Conditions_2021_10_05_revMP_fin%20(1).pdf"
              class="text-m-bold no-color-dec-link"
              >T&C</a
            >
          </li>
        </ul>

        <div class="socials">
          <a
            href="https://discord.com/invite/galaxydiamonds"
            target="_blank"
            class="social-link"
          >
            <img src="~/assets/img/landing/discord.svg" alt="discord-icon" />
          </a>
          <a
            href="https://twitter.com/GalaxyDiaNFT"
            target="_blank"
            class="social-link"
          >
            <img src="~/assets/img/landing/twitter.svg" alt="twitter-icon" />
          </a>
          <a href="/discord" target="_blank" class="social-link">
            <img src="~/assets/img/landing/medium.svg" alt="medium-icon" />
          </a>
        </div>
      </div>

      <div class="text-center mt-8">
        <span class="text-s no-color-link">{{
          $t("marketplace.copyright")
        }}</span>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "LandingFooter",
};
</script>

<style lang="scss" scoped>
@import "assets/scss/components/landing/footer";
</style>
