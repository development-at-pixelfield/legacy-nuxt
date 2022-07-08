<template>
  <div class="navigation">
    <div class="left-side">
      <Icon
        v-if="showBack"
        src="arrow-left.svg"
        size="big"
        class="pointer mr-8"
        @on-click="back"
      ></Icon>
      <span class="text-m-bold pointer" @click="back">{{ title }}</span>
    </div>
    <Button
      v-if="trailingAction"
      :label="trailingLabel"
      :background="'ghost'"
      :size="'medium'"
      :color="'c-white'"
      @on-click="handleClick"
    >
      <span slot="left-icon" class="mr-8 display-f">
        <img src="~/assets/img/icons/interact.svg" alt="hand-pointer" />
      </span>
    </Button>
  </div>
</template>

<script>
import Icon from "../ui/Icon";
import Button from "~/components/ui/Button";

export default {
  name: "Navigation",
  components: {
    Icon,
    Button,
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    trailingAction: {
      type: Boolean,
      defaut: false,
    },
    trailingLabel: {
      type: String,
      default: "",
    },
    customLink: {
      type: String,
      default: "",
    },
    withQuery: {
      type: Boolean,
      default: false,
    },
    showBack: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    handleClick() {
      this.$emit("toggle");
    },
    back() {
      if (this.withQuery) {
        const query = this.$store.getters.query;
        return this.$router.push({ path: this.customLink, query });
      }

      if (this.customLink) {
        return this.$router.push(this.customLink);
      }

      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/components/header/navigation";
</style>
