<template>
  <div
    class="marketplace-wrapper"
    :class="{ 'no-items': !nfts.results.length }"
  >
    <div class="main-container">
      <div class="header mb-16">
        <h2 class="header-big mtb">{{ $t("marketplace.marketplace") }}</h2>
        <div class="filter-block">
          <MultiFilterDropdown
            :list="multyFilterItems"
            :return-object="false"
            :item-value="'value'"
            :item-label="'label'"
            :name.sync="filter.luminosity__in"
            :selected-items="
              filter.luminosity__in ? filter.luminosity__in.split(',') : []
            "
            :placeholder="$t('marketplace.luminosity')"
            class="mb-0 first-filter"
          />

          <FilterDropdown
            :list="filterItems"
            :return-object="false"
            :item-value="'value'"
            :item-label="'label'"
            :name.sync="filter.ordering"
            class="mb-0"
          />
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
            {{ item.price }}Ξ
          </p>
          <p slot="finance" class="finance mtb text-m-bold text-center">
            {{ convertEthereum(item.price) }}
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
import MultiFilterDropdown from "../../components/ui/MultiFilterDropdown";
import MarketItem from "../../components/marketplace/MarketItem";
import Pagination from "../../components/marketplace/Pagination";
import { functions } from "../../utils";
import { catchErrors } from "../../utils/catchErrors";

const filterDefaultVars = {
  page: 1,
  page_size: 30,
  ordering: "",
  luminosity__in: [],
};

export default {
  name: "Index",
  components: {
    FilterDropdown,
    MultiFilterDropdown,
    MarketItem,
    Pagination,
  },
  layout: "auth",
  middleware: "auth",
  async asyncData({ store, route }) {
    try {
      const query = route.query;
      const filter = {};
      Object.keys(filterDefaultVars).forEach((key) => {
        filter[key] = query[key] || "";
      });
      const nfts = await store.dispatch("nfts/getNfts", filter);
      return { nfts };
    } catch (e) {}
  },
  data() {
    return {
      nfts: {},
      filterItems: [
        { label: "Recently listed", value: "recently_listed" },
        { label: "Price (ETH): Highest first", value: "highest" },
        { label: "Price (ETH): Lowest first", value: "lowest" },
      ],
      multyFilterItems: [
        { label: "+1", value: "1" },
        { label: "+2", value: "2" },
        { label: "+3", value: "3" },
        { label: "+4", value: "4" },
        { label: "+5", value: "5" },
        { label: "+6", value: "6" },
      ],
      filter: {},
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
    this.filter = { ...filterDefaultVars };
    const query = this.$route.query;

    Object.keys(this.filter).forEach((key) => {
      if (query[key] && key === "luminosity__in") {
        this.filter[key] = query[key].split(",");
      } else this.filter[key] = query[key] || "";
    });

    this.setDefaultWatch();
  },
  methods: {
    setDefaultWatch() {
      this.$watch("filter.page", (val) => {
        const cleanObject = functions.cleanObject(this.$route.query);
        cleanObject.page = val;
        this.fetchNfts(cleanObject);
      });

      this.$watch("filter.ordering", (val) => {
        if (!val) return this.setQuery(null, "ordering");
        this.setQuery(val, "ordering");
      });

      this.$watch("filter.luminosity__in", (val) => {
        if (!val.length) return this.setQuery(null, "luminosity__in");
        const str = val.join(",");
        this.setQuery(str, "luminosity__in");
      });
    },

    async setQuery(val, type) {
      let query = this.$route.query;
      query = { ...this.$route.query, [type]: val };

      const cleanObject = await functions.cleanObject(query);
      await this.$router.replace({ query: cleanObject });

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
