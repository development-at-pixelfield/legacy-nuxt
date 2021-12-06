<template>
  <div
    class="marketplace-wrapper"
    :class="{ 'no-items': !nfts.results.length }"
  >
    <div class="filter">
      <FilterList :is-open-panel.sync="isOpenPanel" />
    </div>
    <div class="main-container" :class="{ 'panel-open': isOpenPanel }">
      <div class="header mb-16">
        <h2 class="header-big mtb">
          {{ $t("marketplace.marketplace") }}
        </h2>
        <div class="filter-block">
          <FilterDropdown
            :list="filterItems"
            :return-object="false"
            :item-value="'value'"
            :item-label="'label'"
            :name.sync="filter.ordering"
            class="mb-0"
          />
          <FilterList class="mobile-filter" :is-open-panel.sync="isOpenPanel" />
        </div>
      </div>

      <div v-if="nfts.results.length" class="content">
        <MarketItem
          v-for="item in nfts.results"
          :key="item.uid"
          @on-click="toDetail(item)"
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
          </p>
        </MarketItem>
      </div>

      <div v-if="nfts.count" class="pagination-wrapper">
        <Pagination :total="nfts.count" :page.sync="filter.page" />
      </div>
    </div>
  </div>
</template>

<script>
import FilterDropdown from "../../components/ui/FilterDropdown";
import MarketItem from "../../components/marketplace/MarketItem";
import Pagination from "../../components/marketplace/Pagination";
import FilterList from "../../components/marketplace/filter/FilterList";
import { functions } from "../../utils";
import { catchErrors } from "../../utils/catchErrors";
const filterDefaultVars = {
  page: 1,
  page_size: 30,
  ordering: "",
  name: "",
  luminosity__in: [],
  quality_level__in: [],
  color_class: "",
  is_constellation: false,
  nft_type: "",
  eth_price__gte: 0.43,
  eth_price__lte: 5.41,
  constellation: "",
};

export default {
  name: "Index",
  components: {
    FilterDropdown,
    MarketItem,
    Pagination,
    FilterList,
  },
  layout: "auth",
  middleware: "auth",
  async asyncData({ store, route }) {
    try {
      const query = route.query;
      const filter = { ...filterDefaultVars };
      Object.keys(filter).forEach((key) => {
        filter[key] = query[key] || filterDefaultVars[key];
      });

      const nfts = await store.dispatch("nfts/getNfts", filter);
      return { nfts, filter };
    } catch (e) {}
  },
  data() {
    return {
      isOpenPanel: false,
      nfts: {},
      filter: {},
      filterItems: [
        { label: "Recently listed", value: "recently_listed" },
        { label: "Price (ETH): Highest first", value: "highest" },
        { label: "Price (ETH): Lowest first", value: "lowest" },
      ],
    };
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
  created() {
    this.setDefaultWatch();
  },

  mounted() {
    this.$nuxt.$on("applyFilters", async (values) => {
      let cleanObject = {};
      if (Object.keys(values).length) {
        values.page = this.filter.page;
        values.ordering = this.filter.ordering;
        cleanObject = await functions.cleanObject(values);
      } else {
        const filters = { ...filterDefaultVars };
        filters.page = this.filter.page;
        filters.ordering = this.filter.ordering;
        delete filters.page_size;
        delete filters.eth_price__gte;
        delete filters.eth_price__lte;

        cleanObject = await functions.cleanObject(filters);
      }

      await this.$router.push({ query: cleanObject });
      await this.fetchNfts(cleanObject);
    });
  },

  beforeDestroy() {
    this.$nuxt.$off("applyFilters");
  },

  methods: {
    setDefaultWatch() {
      // this.$watch("filter.page", (val) => {
      //   const cleanObject = functions.cleanObject(this.$route.query);
      //   cleanObject.page = val;
      //   this.fetchNfts(cleanObject);
      // });

      this.$watch("filter.ordering", (val) => {
        if (!val) return this.setQuery(null);
        return this.setQuery(val);
      });
    },

    async setQuery(val) {
      const query = { ...this.filter };
      delete query.page;
      delete query.page_size;

      // if (!val) {
      //   delete query.eth_price__gte;
      //   delete query.eth_price__lte;
      // }

      const cleanObject = await functions.cleanObject(query);
      await this.$router.push({ query: cleanObject });

      await this.fetchNfts(cleanObject);
    },

    toDetail(item) {
      this.$router.push(`/marketplace/${item.uid}`);
    },

    async fetchNfts(query) {
      try {
        this.nfts = await this.$store.dispatch("nfts/getNfts", query);
      } catch (e) {
        await this.$store.commit("setSnackbar", {
          show: true,
          message: catchErrors(e),
          color: "error",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/pages/marketplace";
</style>
