<template>
  <div
    class="marketplace-wrapper"
    :class="{ 'no-items': !nfts.results.length }"
  >
    <div class="filter">
      <FilterList
        :is-open-panel.sync="isOpenPanel"
        :apply-filter="isOpenPanel"
        :count="count"
      />
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

      <div class="filters mb-16">
        <FiltersItems :filter="filterHeader" :count.sync="count" />
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

      <div v-else class="empty-wrapper">
        <span class="empty-image"
          ><img src="~/assets/img/empty-img.svg" alt="empty-image"
        /></span>
        <p class="description mt-0 mb-16 text-center">
          {{ $t("marketplace.emptyDesc") }}
        </p>
        <Button
          class="mb-24"
          :label="$t('marketplace.applyFilters')"
          :background="'primary'"
          :size="'full'"
          :color="'c-white'"
          @on-click="openFilter"
        />
      </div>

      <div v-if="nfts.count" class="pagination-wrapper">
        <Pagination
          :total="nfts.count"
          :page.sync="filter.page"
          :current-page="nfts.current"
          :pages-count="nfts.pages_count"
          :limit="filter.page_size || nfts.page_size"
        />
      </div>
    </div>
  </div>
</template>

<script>
import FilterDropdown from "../../components/ui/FilterDropdown";
import MarketItem from "../../components/marketplace/MarketItem";
import Pagination from "../../components/marketplace/Pagination";
import FilterList from "../../components/marketplace/filter/FilterList";
import FiltersItems from "../../components/marketplace/filter/FiltersItems";
import Button from "../../components/ui/Button";
import { functions } from "../../utils";
import { catchErrors } from "../../utils/catchErrors";
const filterDefaultVars = {
  page: 1,
  page_size: 12,
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
    FiltersItems,
    Button,
  },
  layout: "auth",
  middleware: "auth",
  async asyncData({ store, route }) {
    try {
      const query = route.query;
      const filter = { ...filterDefaultVars };
      Object.keys(filter).forEach((key) => {
        if (typeof query.luminosity__in === "string") {
          filter.luminosity__in = query.luminosity__in.split(",");
        } else if (typeof query.quality_level__in === "string") {
          filter.quality_level__in = query.quality_level__in.split(",");
        } else {
          filter[key] = query[key] || filterDefaultVars[key];
        }
      });

      const nfts = await store.dispatch("nfts/getNfts", filter);
      return { nfts, filter };
    } catch (e) {}
  },
  data() {
    return {
      isOpenPanel: false,
      count: 0,
      nfts: {},
      filter: {},
      filterHeader: {},
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
    this.filterHeader = { ...this.filter };
    this.setDefaultWatch();
  },

  mounted() {
    this.$nuxt.$on("applyFilters", async (values) => {
      if (Object.keys(values).length) {
        values.page = this.filter.page;
        values.ordering = this.filter.ordering;

        this.filter = values;
        await this.setQuery(values);
      } else {
        const filters = { ...filterDefaultVars };
        filters.page = this.filter.page;
        filters.ordering = this.filter.ordering;
        delete filters.eth_price__gte;
        delete filters.eth_price__lte;

        this.filter = filters;
        await this.setQuery(filters);
      }
    });
  },

  beforeDestroy() {
    this.$nuxt.$off("applyFilters");
  },

  methods: {
    openFilter() {
      this.isOpenPanel = true;
    },
    setDefaultWatch() {
      this.$watch("filter.page", (val) => {
        const cleanObject = functions.cleanObject(this.$route.query);
        cleanObject.page = val;
        this.fetchNfts(cleanObject);
      });

      this.$watch("filter.ordering", (val) => {
        const query = { ...this.filter };
        this.setQuery(query);
      });
    },

    async setQuery(query) {
      const cleanObject = await functions.cleanObject(query);
      await this.fetchNfts(cleanObject);

      delete cleanObject.page;
      delete cleanObject.page_size;
      this.filterHeader = cleanObject;
      await this.$router.push({ query: cleanObject });
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
