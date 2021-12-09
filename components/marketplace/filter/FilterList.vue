<template>
  <div
    class="filter-wrapper"
    :class="{ 'big-desktop': showDesktopPanel, 'big-mobile': shoMobilePanel }"
  >
    <div v-if="!showPanel" class="toggle-item">
      <Icon
        src="filter.svg"
        size="big"
        class="filter-icon"
        @on-click="toggleFilter"
      />
      <span v-if="count" class="count text-s-bold">{{ count }}</span>
    </div>

    <div v-if="showPanel" class="filter-list">
      <div class="desktop-header header">
        <div class="left-side">
          <Icon src="filter.svg" size="big" />
          <span class="text-m-bold title">{{ $t("marketplace.filter") }}</span>
        </div>
        <div class="right-side">
          <Icon
            src="collapse.svg"
            size="big"
            class="filter-icon"
            @on-click="toggleFilter"
          />
        </div>
      </div>

      <div class="mobile-header header">
        <div class="left-side">
          <span class="text-m-bold">{{ $t("marketplace.clearAll") }}</span>
          <Icon
            src="close-modal.svg"
            size="big"
            class="pointer"
            @on-click="clearFilter"
          />
        </div>
        <div class="right-side">
          <Button
            :label="$t('marketplace.apply')"
            :background="'primary'"
            :size="'custom-medium'"
            :color="'c-white'"
            @on-click="applyFilters"
          />
        </div>
      </div>

      <div v-if="canShow" class="filters mt-24">
        <SearchFilter
          :list="searchItems"
          :return-object="false"
          :item-value="'value'"
          :item-label="'label'"
          :label="$t('marketplace.name')"
          :placeholder="$t('marketplace.search')"
          :name.sync="filter.name"
          class="mb-0"
        />

        <MultiFilterDropdown
          v-if="formOptions.luminosity"
          :list="formOptions.luminosity"
          :return-object="false"
          :item-value="'value'"
          :item-label="'label'"
          :name.sync="filter.luminosity__in"
          :selected-items="convertArray(filter.luminosity__in)"
          :label="$t('marketplace.luminosity')"
          :show-count="true"
          :field="'luminosity__in'"
          :placeholder="$t('marketplace.select')"
          class="mb-0 first-filter"
        />

        <MultiFilterDropdown
          v-if="formOptions.quality"
          :list="formOptions.quality"
          :return-object="false"
          :item-value="'value'"
          :item-label="'label'"
          :name.sync="filter.quality_level__in"
          :selected-items="convertArray(filter.quality_level__in)"
          :label="$t('marketplace.quality')"
          :show-count="true"
          :placeholder="$t('marketplace.select')"
          class="mb-0 first-filter"
        />

        <FilterDropdown
          v-if="formOptions.color"
          :list="formOptions.color"
          :return-object="false"
          :item-value="'value'"
          :item-label="'label'"
          :label="$t('marketplace.color')"
          :placeholder="$t('marketplace.select')"
          :name.sync="filter.color_class"
          class="mb-0"
        />

        <p class="mt-24 mb- text-s-bold">{{ $t("marketplace.type") }}</p>
        <div class="radio">
          <Radio
            :name.sync="filter.nft_type"
            :radio-name="'filter-type'"
            :value="'planet'"
          >
            <label slot="label" class="text-m">{{
              $t("marketplace.planet")
            }}</label>
          </Radio>
          <Radio
            :name.sync="filter.nft_type"
            :radio-name="'filter-type'"
            :value="'star'"
            class="ml-8"
          >
            <label slot="label" class="text-m">{{
              $t("marketplace.star")
            }}</label>
          </Radio>
        </div>

        <Range
          class="mb-8 mt-24"
          :min-value.sync="filter.eth_price__gte"
          :max-value.sync="filter.eth_price__lte"
          :type="type"
        />

        <div class="apply-action mb-24">
          <Button
            :label="$t('marketplace.apply')"
            :background="'ghost'"
            :size="'custom-medium'"
            :color="'c-white'"
            @on-click="applyFilters"
          />
        </div>

        <div class="mb-24">
          <p class="mtb">{{ $t("marketplace.partTitle") }}</p>
          <Checkbox
            :name.sync="filter.is_constellation"
            class="mt-4 filter-check"
          >
            <label slot="label" class="text-m">
              {{ $t("marketplace.partLabel") }}
            </label>
          </Checkbox>
        </div>

        <FilterDropdown
          :list="constellationItems"
          :return-object="false"
          :item-value="'value'"
          :item-label="'label'"
          :label="$t('marketplace.constellation')"
          :placeholder="$t('marketplace.select')"
          :name.sync="filter.constellation"
          :must-scroll="true"
          class="mb-0"
        />
      </div>
    </div>
  </div>
</template>

<script>
import MultiFilterDropdown from "../../ui/MultiFilterDropdown";
import FilterDropdown from "../../ui/FilterDropdown";
import SearchFilter from "../../ui/SearchFilter";
import Icon from "../../ui/Icon";
import Button from "../../ui/Button";
import Checkbox from "../../ui/Checkbox";
import Radio from "../../ui/Radio";
import Range from "../../ui/Range";
const filterDefaultVars = {
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
  name: "FilterList",
  components: {
    Icon,
    MultiFilterDropdown,
    FilterDropdown,
    Button,
    Checkbox,
    Radio,
    SearchFilter,
    Range,
  },
  props: {
    count: {
      type: Number,
      default: 0,
    },
    applyFilter: {
      type: Boolean,
      default: false,
    },
    queryFilter: {
      type: Object,
      default: () => {},
    },
    formOptions: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      showPanel: false,
      canShow: false,
      type: "desktop",
      filter: {
        name: "",
        luminosity__in: [],
        quality_level__in: [],
        color_class: "",
        is_constellation: false,
        nft_type: "",
        eth_price__gte: 0.43,
        eth_price__lte: 5.41,
        constellation: "",
      },
      luminosityArr: [],
      qualityLevelArr: [],
      constellationItems: [
        { label: "Red", value: "red" },
        { label: "Blue", value: "blue" },
        { label: "Green", value: "green" },
      ],
      searchItems: [
        { label: "Red", value: "red" },
        { label: "Blue", value: "blue" },
        { label: "Green", value: "green" },
      ],
    };
  },
  computed: {
    convertArray() {
      return (items) => {
        if (items) {
          if (typeof items === "string") return items.split(",");

          return items;
        }
        return [];
      };
    },
    showDesktopPanel() {
      return this.showPanel && this.type === "desktop";
    },
    shoMobilePanel() {
      return this.showPanel && this.type === "mobile";
    },
  },
  watch: {
    $route(val) {
      if (!Object.keys(val.query).length) {
        this.filter = { ...filterDefaultVars };
      }
    },
    queryFilter(val) {
      this.setFilters(val);
    },
    applyFilter(val) {
      this.showPanel = val;
    },
    showPanel(val) {
      this.$emit("update:is-open-panel", val);
      if (val) {
        setTimeout(() => {
          this.canShow = true;
        }, 300);

        if (this.type === "mobile") {
          const html = document.getElementsByTagName("html")[0];
          html.style.overflowY = "hidden";
        }
      } else this.canShow = false;
    },
  },
  created() {
    const filter = { ...this.filter };
    this.setFilters(filter);
  },
  mounted() {
    window.addEventListener("resize", this.reportWindowSize);
    this.reportWindowSize();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.reportWindowSize);
  },
  methods: {
    reportWindowSize() {
      if (window.innerWidth < 767) this.type = "mobile";
      else this.type = "desktop";
    },
    toggleFilter() {
      this.showPanel = !this.showPanel;
    },
    clearFilter() {
      this.showPanel = false;
      this.filter = { ...filterDefaultVars };
      this.$nuxt.$emit("applyFilters", {});
    },
    applyFilters() {
      this.showPanel = false;
      this.$nuxt.$emit("applyFilters", this.filter);
    },
    setFilters(values) {
      const query = this.$route.query;
      const filter = { ...values };

      const arr = ["luminosity__in", "quality_level__in"];
      Object.keys(filterDefaultVars).forEach((key) => {
        if (arr.includes(query[key]) && typeof query[key] === "string") {
          filter[key] = query[key].split(",");
        } else {
          filter[key] = query[key] || filterDefaultVars[key];
        }
      });

      this.filter = filter;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/components/marketplace/filter";
</style>
