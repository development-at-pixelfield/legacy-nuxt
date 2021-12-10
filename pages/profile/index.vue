<template>
  <div class="profile-container">
    <div class="user-info">
      <div class="user main-container">
        <div class="left-side">
          <div class="avatar-block">
            <img v-if="imgSrc" :src="imgSrc" alt="avatar" class="avatar-img" />
            <input type="file" class="avatar-input" @change="fileUpload" />
          </div>

          <div class="user-block">
            <p class="mt-0 mb-8 text-m">{{ $auth.user.email }}</p>
            <ul class="user-states mt-0 mb-0">
              <li>
                <p class="header-title mt-0 mb-0">3</p>
                <p class="text-m mt-0 mb-0">{{ $t("profile.stars") }}</p>
              </li>
              <li>
                <p class="header-title mt-0 mb-0">5</p>
                <p class="text-m mt-0 mb-0">{{ $t("profile.planets") }}</p>
              </li>
              <li>
                <p class="header-title mt-0 mb-0">200</p>
                <p class="text-m mt-0 mb-0">{{ $t("profile.points") }}</p>
              </li>
            </ul>
          </div>
        </div>

        <div class="right-side">
          <Button
            class="first-btn"
            :label="$t('profile.verifyAccount')"
            :background="'ghost'"
            :size="'medium'"
            :color="'c-white'"
            @on-click="$router.push('/settings')"
          />
          <Button
            class="first-btn"
            :label="$t('profile.ConnectMetaMask')"
            :background="'ghost'"
            :size="'medium'"
            :color="'c-white'"
            @on-click="connectMetamask"
          />
        </div>
      </div>
    </div>

    <div class="main-container">
      <div class="user-content"></div>
    </div>
  </div>
</template>

<script>
import Button from "../../components/ui/Button";
import { catchErrors } from "../../utils/catchErrors";
export default {
  name: "Index",
  components: {
    Button,
  },
  layout: "auth",
  middleware: "auth",
  data() {
    return {
      imgSrc: "",
    };
  },
  created() {
    if (this.$auth.user.avatar) {
      this.imgSrc = this.$auth.user.avatar;
    }
  },
  methods: {
    async fileUpload(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;

      const reader = new FileReader();
      const vm = this;

      reader.onload = (e) => {
        vm.imgSrc = e.target.result;
      };

      reader.readAsDataURL(files[0]);
      await this.updateAvatar(files[0]);
    },

    async updateAvatar(file) {
      try {
        await this.$store.dispatch("user/updateAvatar", { avatar: file });
        await this.$auth.fetchUser();
        await this.$store.commit("setSnackbar", {
          show: true,
          message: this.$t("snackbar.successAvatar"),
          color: "success",
        });
      } catch (e) {
        await this.$store.commit("setSnackbar", {
          show: true,
          message: catchErrors(e),
          color: "error",
        });
      }
    },
    async connectMetamask() {
      console.log("Start connect metamask");
      console.log(this.$metamask.ethereum);
      console.log(window.ethereum);
      if (!this.$metamask.isEnabled) {
        await this.$store.commit("setSnackbar", {
          show: true,
          message: this.$t("snackbar.metaMask.extensionNotInstalled"),
          color: "error",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/pages/profile";
</style>
