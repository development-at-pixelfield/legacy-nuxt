<template>
  <div class="marketplace-detail">
    <div class="header">
      <div class="main-container">
        <Navigation
          :title="$t('marketplace.marketplace')"
          :custom-link="'/marketplace'"
          class="nav"
        />
        <div class="img-block">
          <WebGl :src="nfts.model_file" />
        </div>
      </div>
    </div>

    <div class="main-container">
      <div class="detail">
        <h1 class="mb-8 mt-0 detail-title">{{ nfts.name }}</h1>
        <div class="finance">
          <span class="header-title">{{ nfts.price_eth }}Ξ</span>
          <span class="header-title ml-16">{{
            convertEthereum(nfts.price_eth)
          }}</span>
        </div>

        <div class="content">
          <div class="header-title">{{ $t("marketplace.story") }}</div>
          <p class="mtb text-m">
            {{ nfts.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from "../../../components/header/Navigation";
import WebGl from "../../../components/marketplace/WebGl";

export default {
  name: "Index",
  components: {
    Navigation,
    WebGl,
  },
  layout: "auth",
  middleware: "auth",
  async asyncData({ store, params }) {
    try {
      const nfts = await store.dispatch("nfts/getNftsById", { uid: params.id });
      return { nfts };
    } catch (e) {}
  },
  computed: {
    convertEthereum() {
      return (price) => {
        const defEthr = 0.00022;
        const usd = price / defEthr;
        return "est. $" + usd.toFixed(2) + "K";
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/pages/marketplace-detail";
</style>
