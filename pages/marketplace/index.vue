<template>
  <div
    class="marketplace-wrapper"
    :class="{ 'no-items': !nfts.results || !nfts.results.length }"
  >
    <div class="filter">
      <FilterList
        :is-open-panel.sync="isOpenPanel"
        :apply-filter="isOpenPanel"
        :count="count"
        :query-filter="filter"
        :form-options="formOptions"
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
          <FilterList
            class="mobile-filter"
            :is-open-panel.sync="isOpenPanel"
            :apply-filter="isOpenPanel"
            :form-options="formOptions"
            :query-filter="filter"
            :count="count"
          />
        </div>
      </div>

      <div class="filters mb-16">
        <FiltersItems
          :filter="filterHeader"
          :count.sync="count"
          :form-options="formOptions"
        />
      </div>

      <div v-if="nfts.results && nfts.results.length" class="content">
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
          :list="nfts.results"
          :total="nfts.count"
          :page.sync="filter.page"
          :page-number="filter.page"
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
import converter from "../../mixins/converter";

const filterDefaultVars = {
  page: 1,
  page_size: 12,
  ordering: "",
  name: "",
  luminosity__in: [],
  quality_level__in: [],
  age__in: [],
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
  mixins: [converter],
  layout(context) {
    if (context.$auth.$state.user) {
      return "auth";
    }
  },
  async asyncData({ store, route, error }) {
    try {
      const formOptions = await store.dispatch("nfts/getNftsForm");

      // console.log(formOptions, "formOptions");

      const query = route.query;
      const filter = { ...filterDefaultVars };
      const arr = ["luminosity__in", "quality_level__in"];
      Object.keys(filter).forEach((key) => {
        if (arr.includes(query[key]) && typeof query[key] === "string") {
          filter[key] = query[key].split(",");
        } else {
          filter[key] = query[key] || filterDefaultVars[key];
        }
      });

      const nfts = await store.dispatch("nfts/getNfts", filter);
      return { nfts, filter, formOptions };
    } catch (e) {
      const status = e.response.status;
      if (status === 404) {
        error({ statusCode: 404, message: "Not found" });
      }
    }
  },
  data() {
    return {
      isOpenPanel: false,
      count: 0,
      nfts: {},
      filter: {},
      ethPrice: null,
      filterHeader: {},
      formOptions: {},
      filterItems: [
        { label: "Recently listed", value: "recently_listed" },
        { label: "Price (ETH): Highest first", value: "highest" },
        { label: "Price (ETH): Lowest first", value: "lowest" },
      ],
    };
  },

  computed: {
    layout() {
      return this.$auth.user ? ["auth"] : [];
    },
    convertEthereum() {
      return (price) => {
        return "est. $" + this.ethPrice * price + "K";
      };
    },
  },
  created() {
    this.filterHeader = { ...this.filter };
    this.setDefaultWatch();
  },

  async mounted() {
    this.$nuxt.$on("applyFilters", async (values) => {
      if (Object.keys(values).length) {
        values.page = this.filter.page;
        values.ordering = this.filter.ordering;

        await this.setQuery(values);
      } else {
        const filters = { ...filterDefaultVars };
        filters.page = this.filter.page;
        filters.ordering = this.filter.ordering;

        delete filters.eth_price__gte;
        delete filters.eth_price__lte;

        await this.setQuery(filters);
      }
    });
    this.ethPrice = (await this.$store.dispatch("fetchEthPrice")).rate;
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

      await this.$router.push({ query: cleanObject });

      setTimeout(() => {
        this.filterHeader = cleanObject;
        this.filter = query;
      }, 0);
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

    toDetail(item) {
      this.$store.commit("setQuery", this.$route.query);
      this.$router.push(`/marketplace/${item.uid}`);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/pages/marketplace";
</style>
