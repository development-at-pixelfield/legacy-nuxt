<template>
  <div class="navigation">
    <Icon
      src="arrow-left.svg"
      size="big"
      class="pointer"
      @on-click="back"
    ></Icon>
    <span class="text-m-bold ml-8">{{ title }}</span>
  </div>
</template>

<script>
import Icon from "../ui/Icon";
export default {
  name: "Navigation",
  components: {
    Icon,
  },
  props: {
    title: {
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
  },
  methods: {
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
