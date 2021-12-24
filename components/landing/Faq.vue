<template>
  <div class="faq-wrapper">
    <div class="full-container">
      <h2 class="mt-0 text-center">{{ $t("faq.title") }}</h2>
      <p class="mt-0 desc no-color-link text-m text-center">
        {{ $t("faq.desc") }}
      </p>

      <div class="content">
        <Accordion>
          <span slot="count" class="count text-s-bold">1</span>
          <div slot="header" class="text-m-bold no-color-link">
            {{ $t("faq.accTitle1") }}
          </div>
          <div slot="list" class="list">
            <p class="mtb text-m no-color-link">
              {{ $t("faq.accDesc1") }}
            </p>
          </div>
        </Accordion>

        <Accordion>
          <span slot="count" class="count text-s-bold">1</span>
          <div slot="header" class="text-m-bold no-color-link">
            {{ $t("faq.accTitle2") }}
          </div>
          <div slot="list" class="list">
            <p class="mtb text-m no-color-link">
              {{ $t("faq.accDesc2") }}
            </p>
          </div>
        </Accordion>

        <Accordion>
          <span slot="count" class="count text-s-bold">1</span>
          <div slot="header" class="text-m-bold no-color-link">
            {{ $t("faq.accTitle3") }}
          </div>
          <div slot="list" class="list">
            <p class="mtb text-m no-color-link">
              {{ $t("faq.accDesc3") }}
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
