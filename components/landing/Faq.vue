<template>
  <div class="faq-wrapper">
    <div class="tablet-container">
      <h2 class="mt-0 text-center header-h">{{ $t("faq.title") }}</h2>
      <div class="subtitle mb-78">{{ $t("faq.desc") }}</div>

      <div class="content">
        <Accordion
          v-for="(faq, index) in faqs"
          :key="`faq_${index}`"
          :last="faqs.length - 1 === index"
        >
          <span slot="count" class="count header-title1">0{{ index + 1 }}</span>
          <div slot="header" class="header-title1 no-color-link">
            {{ faq.question }}
          </div>
          <div slot="list" class="list">
            <p class="mtb text-m no-color-link">
              {{ faq.answer }}
            </p>
          </div>
        </Accordion>
      </div>
      <div class="subtitle mt-50 mb-24">{{ $t("faq.noAnswer") }}</div>
      <div class="icon-wrapper">
        <img
          v-for="(icon, index) in socials"
          :key="`icon_${index}`"
          class="icon pointer"
          :src="require(`~/assets/img/icons/socials/${icon.img}.svg`)"
          alt="icon"
          @click="handleClick(icon.link)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Accordion from "../ui/Accordion";
export default {
  name: "Faq",
  components: {
    Accordion,
  },
  props: {
    faqs: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      socials: [
        { img: "discord", link: "https://discord.gg/vhKsVPdEnP" },
        { img: "facebook", link: "https://www.facebook.com/legacynftcom" },
        { img: "instagram", link: "https://www.instagram.com/legacynftcom/" },
        { img: "email", link: "mailto:support@legacy-nft.com" },
      ],
    };
  },
  methods: {
    handleClick(link) {
      window.open(link, "_blank");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/components/landing/faq.scss";
</style>
