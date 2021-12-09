<template>
  <div>
    <Modals />
    <nuxt />
    <Snackbar
      class="custom-snackbar"
      :type="'snackbar'"
      :active="snackbar.show"
      :position="'bottom-center'"
      :timeout="5000"
      :message="snackbar.message"
      :background-color="snackbar.color"
      @close="closeSnackbar"
    />
  </div>
</template>

<script>
import Snackbar from "../components/ui/Snackbar";
import Modals from "../components/modals/index";
export default {
  name: "Landing",
  components: {
    Modals,
    Snackbar,
  },
  data() {
    return {};
  },
  computed: {
    snackbar() {
      return this.$store.getters.snackbar;
    },
  },
  methods: {
    closeSnackbar() {
      this.$store.commit("setSnackbar", {
        show: false,
        message: "",
        color: "success",
      });
    },
  },
};
</script>

<!--<style  scoped></style>-->
