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
            <p class="mt-0 mb-8 text-m">stars@galaxy.com</p>
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
export default {
  name: "Index",
  components: {
    Button,
  },
  // middleware: 'auth'
  layout: "auth",
  data() {
    return {
      imgSrc: "",
      uploadFile: null,
    };
  },
  methods: {
    fileUpload(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;

      this.uploadFile = files[0];
      const reader = new FileReader();
      const vm = this;

      reader.onload = (e) => {
        vm.imgSrc = e.target.result;
      };

      reader.readAsDataURL(this.uploadFile);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/pages/profile";
</style>
