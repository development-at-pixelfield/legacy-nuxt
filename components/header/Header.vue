<template>
  <header>
    <div class="content">
      <span class="text-m">Marketplace</span>
      <div class="logo-block">
        <img src="~/assets/img/header-logo.svg" alt="logo" />
      </div>
      <div class="user-info">
        <span class="avatar">
          <DropdownList
            :items="items"
            class="profile-dropdown"
            :src="''"
            @action="actionHandler"
          />
        </span>
      </div>
    </div>
  </header>
</template>

<script>
import DropdownList from "../ui/DropdownList";
export default {
  name: "Header",
  components: {
    DropdownList,
  },
  data() {
    return {
      count: 3,
    };
  },

  computed: {
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
