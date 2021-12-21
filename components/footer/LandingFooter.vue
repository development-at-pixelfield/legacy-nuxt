<template>
  <footer>
    <div class="content">
      <p class="mt-0 mb-8 text-m-bold">{{ $t("landing.joinUs") }}</p>
      <div class="action">
        <a href="https://discord.com/invite/galaxydiamonds" class="discord-btn">
          <img src="~/assets/img/icons/discord-big.svg" alt="discord-icon" />
        </a>
      </div>
    </div>

    <Button
      class="top-btn"
      :label="$t('landing.backTop')"
      :background="'primary'"
      :size="'medium'"
      :color="'c-white'"
      @on-click="scrollTop"
    >
      <span slot="icon" class="ml-4 emoji">👆</span>
    </Button>
  </footer>
</template>

<script>
import Button from "../ui/Button";
export default {
  name: "LandingFooter",
  components: {
    Button,
  },
  methods: {
    scrollTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/components/footer/landing-footer";
</style>
