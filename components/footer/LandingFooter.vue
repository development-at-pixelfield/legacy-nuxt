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
          <img
            v-for="(icon, index) in socials"
            :key="`icon_${index}`"
            class="link pointer"
            :src="require(`~/assets/img/icons/socials/${icon.img}.svg`)"
            @click="handle(icon)"
          />
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
  data() {
    return {
      socials: [
        { img: "discord", link: "https://discord.gg/vhKsVPdEnP" },
        { img: "facebook", link: "https://www.facebook.com/legacynftcom" },
        { img: "instagram", link: "https://www.instagram.com/legacynftcom/" },
      ],
    };
  },
  methods: {
    handle(icon) {
      window.open(icon.link, "_blank");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/components/landing/footer";
</style>
