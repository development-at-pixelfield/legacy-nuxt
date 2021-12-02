<template>
  <div class="marketplace-wrapper">
    <div class="main-container">
      <div class="header mb-16">
        <h2 class="header-big mtb">{{ $t("marketplace.marketplace") }}</h2>
        <div class="filter-block">
          <MultiFilterDropdown
            :list="multyFilterItems"
            :return-object="false"
            :item-value="'value'"
            :item-label="'label'"
            :name.sync="category"
            :selected-items="category"
            :placeholder="$t('marketplace.luminosity')"
            class="mb-0 first-filter"
          />

          <FilterDropdown
            :list="filterItems"
            :return-object="false"
            :item-value="'value'"
            :item-label="'label'"
            :name.sync="order"
            class="mb-0"
          />
        </div>
      </div>

      <div class="content">
        <MarketItem v-for="item in 16" :key="item" @on-click="toDetail(item)">
          <img slot="image" src="~/assets/img/bear-head.svg" alt="image" />
          <p slot="title" class="text-m-bold mt-8 mb-8 text-center">
            {Item name} <br />
            2nd line
          </p>
          <p slot="profit" class="profit mtb text-m text-center">107.50Ξ</p>
          <p slot="finance" class="finance mtb text-m-bold text-center">
            est. $314.64K
          </p>
        </MarketItem>
      </div>

      <div class="pagination-wrapper">
        <Pagination :total="380" />
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
  data() {
    return {
      order: "",
      category: [],
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
    };
  },
  watch: {
    order(val) {
      if (!val) {
        return this.setQuery(null, "order");
      }

      this.setQuery(val, "order");
    },
    category(val) {
      if (!val.length) {
        return this.setQuery(null, "category");
      }

      const str = val.join(",");
      this.setQuery(str, "category");
    },
  },
  created() {
    const query = functions.cleanObject(this.$route.query);

    if (query.category) this.category = query.category.split(",");
    if (query.order) this.order = query.order;

    this.$router.push({ path: `/marketplace`, query });
  },
  methods: {
    setQuery(val, type) {
      if (val?.length) {
        let query = this.$route.query;
        // query[type] = val;
        query = { [type]: val };
        // this.$router.replace({ query });
        this.$router.push({ path: this.$route.path, query });
      } else {
        const query = Object.assign({}, this.$route.query);
        delete query[type];
        this.$router.replace({ query });
      }
    },
    toDetail(item) {
      this.$router.push(`/marketplace/${item}`);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/pages/marketplace";
</style>
