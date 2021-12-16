<template>
  <div
    class="auth-wrapper"
    :class="{ 'register-wrapper': $route.name === 'register' }"
  >
    <Leaderboard />
    <AuthHeader />
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
import Leaderboard from "../components/header/Leaderboard";
import Snackbar from "../components/ui/Snackbar";
import AuthHeader from "../components/header/AuthHeader";
export default {
  components: {
    Snackbar,
    AuthHeader,
    Leaderboard,
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
