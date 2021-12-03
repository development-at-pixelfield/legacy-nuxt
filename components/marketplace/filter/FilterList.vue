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

      <div class="filters mt-24">
        <MultiFilterDropdown
          :list="luminosityFilterItems"
          :return-object="false"
          :item-value="'value'"
          :item-label="'label'"
          :name.sync="filter.luminosity__in"
          :selected-items="
            filter.luminosity__in ? filter.luminosity__in.split(',') : []
          "
          :label="$t('marketplace.luminosity')"
          :show-count="true"
          :placeholder="$t('marketplace.luminosity')"
          class="mb-0 first-filter"
        />

        <MultiFilterDropdown
          :list="qualityItems"
          :return-object="false"
          :item-value="'value'"
          :item-label="'label'"
          :name.sync="filter.quality"
          :selected-items="filter.quality ? filter.quality.split(',') : []"
          :label="$t('marketplace.quality')"
          :show-count="true"
          :placeholder="$t('marketplace.quality')"
          class="mb-0 first-filter"
        />
      </div>
    </div>
  </div>
</template>

<script>
import MultiFilterDropdown from "../../ui/MultiFilterDropdown";
import Icon from "../../ui/Icon";
import Button from "../../ui/Button";
export default {
  name: "FilterList",
  components: {
    Icon,
    MultiFilterDropdown,
    Button,
  },
  data() {
    return {
      showPanel: false,
      count: 3,
      type: "desktop",
      filter: {
        luminosity__in: "",
        quality: "",
      },
      luminosityFilterItems: [
        { label: "+1", value: "1" },
        { label: "+2", value: "2" },
        { label: "+3", value: "3" },
        { label: "+4", value: "4" },
        { label: "+5", value: "5" },
        { label: "+6", value: "6" },
      ],
      qualityItems: [
        { label: "Good", value: "1" },
        { label: "Normal", value: "2" },
        { label: "Bad", value: "3" },
      ],
    };
  },
  computed: {
    showDesktopPanel() {
      return this.showPanel && this.type === "desktop";
    },
    shoMobilePanel() {
      return this.showPanel && this.type === "mobile";
    },
  },
  watch: {
    showPanel(val) {
      this.$emit("update:is-open-panel", val);
    },
  },
  mounted() {
    if (window.innerWidth < 767) {
      this.type = "mobile";
    }
  },
  methods: {
    toggleFilter() {
      this.showPanel = !this.showPanel;
    },
    clearFilter() {
      console.log("clearFilter");
    },
    applyFilters() {
      console.log("applyFilters");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/components/marketplace/filter";
</style>
