<template>
  <div class="main-container">
    <main>
      <h1>{{ $t("helpPage.title") }}</h1>
      <p class="bold">{{ $t("helpPage.p1") }}</p>
      <p>{{ $t("helpPage.p2") }}</p>
      <PanelContainer>
        <template slot="left">
          <img src="~/assets/img/help/wallet-1.svg" alt="Install" />
        </template>
        <template slot="right">
          <nuxt-link
            to="/"
            target="_blank"
            class="
              custom-button
              custom-button__primary
              custom-button__c-white
              custom-button__medium
            "
          >
            {{ $t("helpPage.learnMore") }}
          </nuxt-link>
        </template>
        <div class="in-panel-div">
          <h2>{{ $t("helpPage.panel1.header") }}</h2>
          <p>{{ $t("helpPage.panel1.content") }}</p>
        </div>
      </PanelContainer>
      <PanelContainer>
        <template slot="left">
          <img src="~/assets/img/help/wallet-2.svg" alt="Buy ETH" />
        </template>
        <template slot="right">
          <nuxt-link
            to="/"
            target="_blank"
            class="
              custom-button
              custom-button__primary
              custom-button__c-white
              custom-button__medium
            "
          >
            {{ $t("helpPage.learnMore") }}
          </nuxt-link>
        </template>
        <div class="in-panel-div">
          <h2>{{ $t("helpPage.panel2.header") }}</h2>
          <p>{{ $t("helpPage.panel2.content") }}</p>
        </div>
      </PanelContainer>
    </main>
  </div>
</template>

<script>
import PanelContainer from "../../components/ui/PanelContainer.vue";

export default {
  name: "Help",
  components: { PanelContainer },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/pages/help";
@import "assets/scss/ui/button";
</style>
