<template>
  <div class="faq-wrapper">
    <div class="full-container">
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
          class="icon"
          :src="require(`~/assets/img/icons/socials/${icon}.svg`)"
          alt="icon"
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
      socials: ["discord", "instagram", "facebook", "email"],
    };
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/components/landing/faq.scss";
</style>
