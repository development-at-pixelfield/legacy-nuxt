<template>
  <div class="welcome-wrapper">
    <div class="content tablet-container">
      <div class="left-side">
        <h2 class="header-h no-color-link">
          {{ $t("landing.joinTitle1") }}
        </h2>

        <p class="sub-title no-color-link">
          {{ $t("landing.joinDesc1") }}
        </p>
        <img
          v-for="(icon, index) in icons"
          :key="`icon_${index}`"
          :src="require(`~/assets/img/icons/socials/${icon.img}.svg`)"
          alt=""
          class="icon pointer"
          @click="handle(icon.link)"
        />
      </div>

      <div class="right-side">
        <span class="img-block">
          <img src="~/assets/img/landing/frame.png" alt="texture" />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Welcome",
  data() {
    return {
      icons: [
        { img: "discord", link: "https://discord.gg/vhKsVPdEnP" },
        { img: "facebook", link: "https://www.facebook.com/legacynftcom" },
        { img: "instagram", link: "https://www.instagram.com/legacynftcom/" },
      ],
    };
  },
  methods: {
    handle(link) {
      window.open(link, "_blank");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/components/landing/join-us";
</style>
