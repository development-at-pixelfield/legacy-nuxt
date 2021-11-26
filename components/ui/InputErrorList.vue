<template>
  <div class="error-wrapper">
    <div v-for="(rule, index) in rules" :key="index" class="errors-list">
      <p v-if="!error[rule.name] && hasError" class="text-s error-message">
        {{ rule.text }}
      </p>
    </div>
    <div
      v-if="customError && typeof customError === 'object'"
      class="errors-list"
    >
      <p
        v-for="(cError, index) in customError"
        :key="index"
        class="text-s error-message"
      >
        {{ cError.text ? cError.text : "Something went wrong" }}
      </p>
    </div>
    <div v-else-if="customError && customError.type" class="errors-list">
      <p class="text-s error-message">
        {{ customError.text ? customError.text : "Something went wrong" }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "InputErrorList",
  props: {
    rules: {
      type: Array,
      required: false,
      default: null,
    },
    error: {
      type: Object,
      required: false,
      default: null,
    },
    customError: {
      type: [Object, Array],
      required: false,
      default: null,
    },
    hasError: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "/assets/scss/ui/input-error-list";
</style>
