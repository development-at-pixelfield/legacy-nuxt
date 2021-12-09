<template>
  <div
    class="main_container"
    style="max-width: 500px; margin: 0 auto; display: flex; align-items: center"
  >
    <div>
      <h1 v-if="error.statusCode === 404">404, We are sorry page not found</h1>
      <h1 v-else>An error occurred - {{ error.statusCode }}</h1>
      <NuxtLink style="text-align: center" to="/">Home page</NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      required: false,
      default: () => {},
    },
  },
  data() {
    return {};
  },
  head() {},
};
</script>
