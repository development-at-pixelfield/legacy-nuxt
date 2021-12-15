<template>
  <div class="auth-wrapper">
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
    <Modal />
  </div>
</template>
<script>
import Snackbar from "../components/ui/Snackbar";
import AuthHeader from "../components/header/AuthHeader";
import Modal from "~/components/modals/nft/PurchaseModal.vue";
export default {
  components: {
    Snackbar,
    AuthHeader,
    Modal,
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
