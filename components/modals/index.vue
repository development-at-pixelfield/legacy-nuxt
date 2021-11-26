<template>
  <transition v-if="modal.show" name="modal" :duration="333" mode="out-in">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <DeleteAccount
          v-if="modal.type === 'delete-account'"
          key="confirm"
          @close="close"
        />
      </div>
    </div>
  </transition>
</template>

<script>
import DeleteAccount from "./DeleteAccount";
export default {
  name: "Modals",
  components: {
    DeleteAccount,
  },
  computed: {
    modal() {
      return this.$store.getters.modal;
    },
  },

  methods: {
    close(name) {
      this.$store.commit("setModal", {
        show: false,
        type: null,
        data: null,
        close: name || "",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/modals/index";
</style>
