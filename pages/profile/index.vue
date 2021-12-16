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
            <p class="mt-0 mb-8 header-title">
              { Username }
              <img
                :src="require(`assets/img/icons/verified-account.svg`)"
                alt="icon"
              />
            </p>
            <ul class="user-states mt-0 mb-0">
              <li class="user-tag view-offline">
                <span class="user-tag-state"></span>
                <span class="text-m-bold user-tag-text">{{
                  $t("nft_modal.connect_wallet")
                }}</span>
                <img
                  :src="require(`assets/img/icons/caret-right.svg`)"
                  class="user-tag-icon"
                  alt="icon"
                />
              </li>
              <li class="user-tag">
                <img
                  :src="require(`assets/img/gift.svg`)"
                  class="user-tag-gift"
                  alt="icon"
                />
                <span class="text-m-bold user-tag-text"
                  >0 {{ $t("profile.miles") }}</span
                >
                <img
                  :src="require(`assets/img/icons/caret-right.svg`)"
                  class="user-tag-icon"
                  alt="icon"
                />
              </li>
            </ul>
          </div>
        </div>

        <!-- <div class="right-side">
          <Button
            class="first-btn"
            :label="$t('profile.verifyAccount')"
            :background="'ghost'"
            :size="'medium'"
            :color="'c-white'"
            @on-click="$router.push('/settings')"
          />
        </div> -->
      </div>
    </div>

    <div class="main-container">
      <div class="user-content">
        <div class="user-action-block">
          <div class="user-action-block-icon">
            <img :src="require(`assets/img/verify-profile.svg`)" alt="icon" />
          </div>
          <div class="user-action-block-text">
            <p class="mt-0 mb-4 header-title">
              {{ $t("profile.verifyTitle") }}
            </p>
            <p class="mt-0 mb-0 text-m-bold">{{ $t("profile.verifyDesc1") }}</p>
            <p class="mt-0 mb-0 text-m-bold">{{ $t("profile.verifyDesc2") }}</p>
          </div>
          <div class="user-action-block-button">
            <Button
              class="primary-btn"
              :background="'primary'"
              :size="'medium'"
              :color="'c-white'"
              :label="$t('profile.verifyBtn')"
              @on-click="$router.push('/settings')"
            />
          </div>
        </div>
        <div class="user-action-block view-wallet">
          <div class="user-action-block-icon">
            <img :src="require(`assets/img/wallet-profile.svg`)" alt="icon" />
          </div>
          <div class="user-action-block-text">
            <p class="mt-0 mb-4 header-title">
              {{ $t("profile.walletTitle") }}
            </p>
            <p class="mt-0 mb-0 text-m-bold">{{ $t("profile.walletDesc1") }}</p>
            <p class="mt-0 mb-0 link">{{ $t("profile.walletDesc2") }}</p>
          </div>
          <div class="user-action-block-button">
            <Button
              class="primary-btn"
              :background="'primary'"
              :size="'medium'"
              :color="'c-white'"
              :label="$t('profile.walletBtn')"
              @on-click="$router.push('/settings')"
            />
          </div>
        </div>
        <div class="user-action-block view-wallet">
          <div class="user-action-block-icon">
            <img
              :src="require(`assets/img/collection-profile.svg`)"
              alt="icon"
            />
          </div>
          <div class="user-action-block-text">
            <p class="mt-0 mb-4 header-title">
              {{ $t("profile.collectionTitle") }}
            </p>
            <p class="mt-0 mb-0 text-m-bold">
              {{ $t("profile.collectionDesc1") }}
            </p>
            <p class="mt-0 mb-0 text-m-bold">
              {{ $t("profile.collectionDesc2") }}
            </p>
          </div>
          <div class="user-action-block-button">
            <Button
              class="primary-btn"
              :background="'primary'"
              :size="'medium'"
              :color="'c-white'"
              :label="$t('profile.collectionBtn')"
              @on-click="$router.push('/marketplace')"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "../../components/ui/Button";
import { catchErrors } from "../../utils/catchErrors";
import metamask from "../../mixins/metamask";
export default {
  name: "Index",
  components: {
    Button,
  },
  mixins: [metamask],
  layout: "auth",
  middleware: "auth",
  data() {
    return {
      imgSrc: "",
      metamaskAccount: "",
      balance: 0,
      balanceLoaded: false,
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
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/pages/profile";
</style>
