<template>
  <div class="faq-wrapper">
    <div class="full-container">
      <h2 class="mt-0 text-center header-h">{{ $t("faq.title") }}</h2>

      <div class="content">
        <Accordion>
          <span slot="count" class="count header-title1">01</span>
          <div slot="header" class="header-title1 no-color-link">
            {{ $t("faq.accTitle1") }}
          </div>
          <div slot="list" class="list">
            <p class="mtb text-m no-color-link">
              {{ $t("faq.accDesc1") }}
            </p>
          </div>
        </Accordion>

        <Accordion>
          <span slot="count" class="count header-title1">02</span>
          <div slot="header" class="header-title1 no-color-link">
            {{ $t("faq.accTitle1") }}
          </div>
          <div slot="list" class="list">
            <p class="mtb text-m no-color-link">
              {{ $t("faq.accDesc1") }}
            </p>
          </div>
        </Accordion>

        <Accordion :last="true">
          <span slot="count" class="count header-title1">03</span>
          <div slot="header" class="header-title1 no-color-link">
            {{ $t("faq.accTitle1") }}
          </div>
          <div slot="list" class="list">
            <p class="mtb text-m no-color-link">
              {{ $t("faq.accDesc1") }}
            </p>
          </div>
        </Accordion>
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
};
</script>

<style lang="scss" scoped>
@import "assets/scss/components/landing/faq.scss";
</style>
