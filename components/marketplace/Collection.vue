<template>
  <div class="main-container">
    <div class="content-container">
      <div class="header-title1 mb-16">More from {{ constellationName }}</div>
      <div class="collection">
        <MarketItem
          v-for="(item, index) in items"
          :key="`item_${index}`"
          class="item"
        >
          <img
            slot="image"
            :src="
              item.image_cover
                ? item.image_cover
                : require('~/assets/img/bear-head.svg')
            "
            alt="image"
          />
          <p slot="title" class="text-m-bold mt-8 mb-8 text-center">
            {{ item.name }} <br />
          </p>
          <p slot="profit" class="profit mtb text-m text-center">
            {{ item.price_eth }}Ξ
          </p>
          <p slot="finance" class="finance mtb text-m-bold text-center">
            {{ convertEthereum(item.price_eth) }}
          </p></MarketItem
        >
      </div>
    </div>
  </div>
</template>

<script>
import MarketItem from "../../components/marketplace/MarketItem";

export default {
  name: "MarketplaceCollection",
  components: {
    MarketItem,
  },
  props: {
    constellationName: {
      type: String,
      required: false,
      default: "",
    },
  },
  data() {
    return {
      items: Array(10).fill({ name: "Example", price_eth: 1 }),
    };
  },
  computed: {
    convertEthereum() {
      return (price) => {
        return "est. $" + Number(this.ethPrice * price).toFixed(2);
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/marketplace/collection";
</style>
