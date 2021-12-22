<template>
  <div class="road-item">
    <div class="left-side">
      <div class="count-block">
        <slot name="count"></slot>
        <span
          v-if="status === 'new'"
          class="vote-action"
          @click="$emit('add-count')"
        >
          <img src="~/assets/img/icons/caret-up.svg" alt="caret-up" />
        </span>
        <span v-else class="text-s-bold votes">{{ $t("roadmap.votes") }}</span>
      </div>

      <div class="info">
        <slot name="title"></slot>
        <slot name="description"></slot>
      </div>
    </div>

    <div class="right-side">
      <div class="status" :class="{ [`${status}-bg`]: true }">
        <span
          class="status-text text-m-bold"
          :class="{ [`${status}-text`]: true }"
          >{{ statusLabel }}</span
        >
        <span v-if="status === 'completed'" class="checked">
          <img src="~/assets/img/landing/success-check.svg" alt="checkmark" />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RoadmapItem",
  props: {
    status: {
      type: String,
      default: "new",
    },
  },
  data() {
    return {
      pressed: false,
      statuses: { new: "New", progress: "In progress", completed: "Completed" },
    };
  },

  computed: {
    statusLabel() {
      return this.statuses[this.status];
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/components/marketplace/road-item";
</style>
