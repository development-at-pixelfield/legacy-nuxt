<template>
  <div class="pagination">
    <span class="first-item">
      <svg
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.25 19.5L11.75 12L19.25 4.5"
          :stroke="isDisabledLeft"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M11.75 19.5L4.25 12L11.75 4.5"
          :stroke="isDisabledLeft"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </span>
    <span class="prev-item">
      <svg
        width="10"
        height="18"
        viewBox="0 0 10 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.75 16.5L1.25 9L8.75 1.5"
          :stroke="isDisabledLeft"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </span>
    <p class="count-wrapper mtb">
      <span class="current text-m">{{ showCount }} of </span>
      <span class="total text-m">{{ total }}</span>
    </p>
    <span class="next-item">
      <svg
        width="10"
        height="18"
        viewBox="0 0 10 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.75 16.5L1.25 9L8.75 1.5"
          :stroke="isDisabledRight"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </span>
    <span class="last-item" @click="$emit('update:page', 2)">
      <svg
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19.25 19.5L11.75 12L19.25 4.5"
          :stroke="isDisabledRight"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M11.75 19.5L4.25 12L11.75 4.5"
          :stroke="isDisabledRight"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </span>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    total: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      disableLeft: true,
      disableRight: false,
      limit: 30,
      currentCount: 60,
    };
  },
  computed: {
    isDisabledLeft() {
      return this.disableLeft ? "#ACA4B2" : "#FFF";
    },
    isDisabledRight() {
      return this.disableRight ? "#ACA4B2" : "#FFF";
    },
    showCount() {
      return this.currentCount - this.limit + 1 + "-" + this.currentCount;
    },
  },
  watch: {
    currentCount(val) {
      if (val > this.limit && val < this.total - this.limit) {
        this.disableLeft = true;
        this.disableRight = true;
        return;
      }

      if (val < this.limit) {
        this.disableLeft = true;
        this.disableRight = false;
        return;
      }

      if (val > this.total - this.limit) {
        this.disableRight = true;
        this.disableLeft = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/components/marketplace/pagination";
</style>
