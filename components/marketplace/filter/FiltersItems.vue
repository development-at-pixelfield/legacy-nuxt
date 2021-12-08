<template>
  <div class="filters-items">
    <div v-for="item in filters" :key="item.id" class="chip">
      <span class="text-m-bold chip-text"
        >{{ item.label }} ({{ item.value }})</span
      >
      <span class="chip-img" @click="removeValue(item)">
        <img src="~/assets/img/icons/chip-remove.svg" alt="" />
      </span>
    </div>
    <span v-if="filters.length" class="text-m-bold display-f">
      {{ $t("marketplace.clearAll") }}
      <Icon
        src="close-modal.svg"
        size="big"
        class="pointer"
        @on-click="clearFilter"
      />
    </span>
  </div>
</template>

<script>
import { functions } from "../../../utils";
import Icon from "../../ui/Icon";

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
  name: "FiltersItems",
  components: {
    Icon,
  },
  props: {
    filter: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      list: [
        { key: "name", value: "Name" },
        { key: "luminosity__in", value: "Luminosity" },
        { key: "quality_level__in", value: "Quality" },
        { key: "color_class", value: "Color" },
        { key: "is_constellation", value: "Part of constellation" },
        { key: "nft_type", value: "Type" },
        { key: "constellation", value: "Constellation" },
      ],
    };
  },
  computed: {
    filters() {
      delete this.filter.page;
      delete this.filter.page_size;

      let arr = [];
      const cleanObject = functions.cleanObject(this.filter);

      Object.keys(cleanObject).forEach((key) => {
        const item = this.list.find((item) => item.key === key);
        if (item && item.value) {
          let value = "";

          if (typeof cleanObject[key] === "object") {
            value = cleanObject[key].join(",");
          } else if (typeof cleanObject[key] === "boolean") {
            value = cleanObject[key] ? "Yes" : "No";
          } else value = cleanObject[key];

          const obj = {
            id: item.key,
            label: item.value,
            value,
          };
          arr = [...arr, obj];
        }
      });

      if (
        arr.length ||
        cleanObject.eth_price__gte > 0.43 ||
        cleanObject.eth_price__lte < 5.41
      ) {
        const newObj = {
          id: "eth_price__gte",
          label: "Price range",
          value: `Ξ${(+cleanObject.eth_price__gte).toFixed(
            2
          )} - ${(+cleanObject.eth_price__lte).toFixed(2)}`,
        };
        arr.push(newObj);
      }

      this.$emit("update:count", arr.length);
      return arr;
    },
  },
  methods: {
    clearFilter() {
      this.$nuxt.$emit("applyFilters", {});
    },
    removeValue(item) {
      const sendItems = { ...this.filter };
      const key = item.id;
      sendItems[key] = filterDefaultVars[item.id];
      this.$nuxt.$emit("applyFilters", sendItems);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/components/marketplace/filters-items";
</style>
