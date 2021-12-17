<template>
  <header :class="{ fixed: $route.name === 'marketplace' }">
    <div class="content">
      <div class="content-wrapper">
        <nuxt-link to="/marketplace"
          ><span class="text-m marketplace-link">Marketplace</span></nuxt-link
        >
        <div class="logo-block">
          <nuxt-link :to="logoLink"
            ><img
              class="marketplace-link"
              src="~/assets/img/header-logo.svg"
              alt="logo"
          /></nuxt-link>
        </div>
        <div class="waller-info">
          <span class="avatar">
            <DropdownWallet class="profile-dropdown" />
          </span>
        </div>
        <div class="user-info">
          <span class="avatar">
            <DropdownList
              :items="items"
              class="profile-dropdown"
              :src="userAvatar"
              @action="actionHandler"
            />
          </span>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import DropdownList from "../ui/DropdownList";
import DropdownWallet from "../ui/DropdownWallet";
import metamask from "../../mixins/metamask";
export default {
  name: "Header",
  components: {
    DropdownList,
    DropdownWallet,
  },
  mixins: [metamask],
  computed: {
    logoLink() {
      return this.$auth.user ? "/profile" : "/landing";
    },
    userAvatar() {
      return this.$auth.user.avatar ?? "";
    },
    count() {
      return !this.$auth.user.is_email_verified ? 1 : 0;
    },
    items() {
      return [
        {
          label: this.$t("settings.profile"),
          src: require("~/assets/img/icons/menu-profile.svg"),
          color: "#000",
          link: "/profile",
          type: "link",
        },
        {
          label: this.$t("settings.settings"),
          src: require("~/assets/img/icons/menu-settings.svg"),
          color: "#000",
          hasBorder: true,
          link: "/settings",
          type: "link",
          haveNot: this.count,
        },
        {
          label: this.$t("auth.logOut"),
          src: require("~/assets/img/icons/menu-logout.svg"),
          color: "#8C8C8C",
          hasBorder: false,
          type: "action",
          value: "logout",
        },
      ];
    },
  },
  created() {
    if (this.$auth.user) {
      if (
        this.$auth.user.wallet_address != null &&
        this.$auth.user.wallet_address !== ""
      ) {
        this.connectMetamask();
      } else {
        this.$store.commit("setWallet", false);
        this.$store.commit("setWalletAccount", null);
      }
    } else {
      this.$store.commit("setWallet", false);
      this.$store.commit("setWalletAccount", null);
    }
  },
  methods: {
    async actionHandler(item) {
      if (item.value === "logout") {
        await this.$auth.logout();
        await this.$router.push("/login");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/components/header/header";
</style>
