<template>
  <div class="form-container full-h">
    <h1 class="header-title">{{ $t("settings.settings") }}</h1>
    <div class="content">
      <div v-if="showVerifyEmail" class="form-group mb-24">
        <div class="header-row mb-16">
          <p class="mtb text-m-bold">
            {{ $t("settings.basicVerification") }}
          </p>
          <span class="text-s">2 {{ $t("settings.minutes") }}</span>
        </div>
        <SettingItem :type="'action'">
          <img
            slot="icon"
            src="~/assets/img/icons/warning-circle.svg"
            alt="icon"
          />
          <p slot="sub-title" class="text-m-bold mtb">
            {{ $t("settings.verifyEmail") }}
          </p>
          <p
            slot="action"
            class="action-text text-m mtb subtitle"
            @click="resendEmail"
          >
            {{ $t("settings.resend") }}
          </p>
        </SettingItem>
      </div>
      <div v-else-if="showVerificationInProgress">
        <SettingVerificationItem />
      </div>
      <div v-else>
        <SettingItem :type="'card'">
          <img
            slot="icon"
            src="~/assets/img/icons/green-checkbox-cirlce.svg"
            alt="icon"
          />
          <p slot="sub-title" class="text-m mtb">
            {{ $t("settings.emailVerified") }}
          </p>
        </SettingItem>
      </div>

      <div class="form-group mb-24">
        <p class="mt-0 mb-16 text-m-bold">
          {{ $t("settings.accountSettings") }}
        </p>

        <Input
          class="mb-16"
          :type="'email'"
          :model.sync="email"
          :label="$t('auth.email')"
          :error="$v.email"
          :rules="rules.email"
          :is-submit="isSubmit"
        />

        <Input
          class="mb-16"
          :type="'text'"
          :model.sync="username"
          :label="$t('auth.username')"
          :error="$v.username"
          :rules="rules.username"
          :is-submit="isSubmit"
        />

        <SettingItem :type="'link'" :link="'/settings/change-password'">
          <p slot="sub-title" class="text-m mtb subtitle">
            {{ $t("settings.changePassword") }}
          </p>
        </SettingItem>
      </div>

      <div class="form-group mb-24">
        <p class="mt-0 mb-16 text-m-bold">
          {{ $t("settings.notifications") }}
        </p>

        <SettingItem :type="'action'">
          <p slot="title" class="text-m-bold mtb">
            {{ $t("settings.NFTAlerts") }}
          </p>
          <p slot="sub-title" class="text-m mtb">
            {{ $t("settings.alertToEmail") }}
          </p>
          <Checkbox slot="action" :name.sync="showAlerts" />
        </SettingItem>
      </div>

      <div class="form-group">
        <Button
          class="mb-24"
          :label="$t('settings.updateChanges')"
          :background="'primary'"
          :size="'full'"
          :color="'c-white'"
          @on-click="updateChanges"
        />
        <Button
          :label="$t('settings.deleteAccount')"
          :background="'warning'"
          :size="'full'"
          :color="'c-warning'"
          @on-click="openModal"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { email, minLength, required } from "vuelidate/lib/validators";
import Input from "../../components/ui/Input";
import SettingItem from "../../components/settings/SettingItem";
import Checkbox from "../../components/ui/Checkbox";
import Button from "../../components/ui/Button";
import { catchErrors } from "../../utils/catchErrors";
import SettingVerificationItem from "~/components/settings/SettingVerificationItem.vue";
export default {
  name: "Index",
  components: {
    Input,
    SettingItem,
    Checkbox,
    Button,
    SettingVerificationItem,
  },
  layout: "auth",
  middleware: "auth",
  validations: {
    email: {
      required,
      email,
      checkEmailSymbol(email) {
        return email.includes("@");
      },
    },
    username: {
      minLength: minLength(5),
    },
  },
  data() {
    return {
      isSubmit: false,
      email: "",
      username: "",
      showAlerts: false,
      rules: {
        email: [
          { name: "required", text: this.$t("validations.notEmpty") },
          {
            name: "email",
            text: this.$t("validations.validEmail"),
          },
          {
            name: "checkEmailSymbol",
            text: this.$t("validations.addEmail"),
          },
        ],
        username: [
          {
            name: "minLength",
            text: "Must have more 5 characters",
          },
        ],
      },
    };
  },

  computed: {
    showVerificationInProgress() {
      return (
        this.$auth.user.verification_in_progress &&
        !this.$auth.user.is_email_verified
      );
    },
    showVerifyEmail() {
      return (
        !this.$auth.user.is_email_verified &&
        !this.$auth.user.verification_in_progress
      );
    },
  },

  created() {
    this.email = this.$auth.user.email;
    this.username = this.$auth.user.username || "";
    this.showAlerts = this.$auth.user.nft_notifications;
  },

  methods: {
    async beforeUpdate() {
      await this.$v.$touch();
      this.isSubmit = true;
    },

    async updateChanges() {
      await this.beforeUpdate();
      const isEmailChanged = this.email !== this.$auth.user.email;
      const isUsernameChanged = this.username !== this.$auth.user.username;
      const isNftNotififcationsChanged =
        this.showAlerts !== this.$auth.user.nft_notifications;

      if (
        !isEmailChanged &&
        !isNftNotififcationsChanged &&
        !isUsernameChanged
      ) {
        await this.$store.commit("setSnackbar", {
          show: true,
          message: this.$t("snackbar.noSettingsChanged"),
          color: "error",
        });
        return;
      }
      if (!this.$v.$invalid) {
        try {
          const data = {
            nft_notifications: this.showAlerts,
            email: this.email,
            username: this.username,
          };
          if (this.email !== this.$auth.user.email) {
            data.email = this.email;
          }
          await this.$store.dispatch("user/updateProfile", data);
          await this.$auth.fetchUser();
          await this.$store.commit("setSnackbar", {
            show: true,
            message: isEmailChanged
              ? this.$t("snackbar.emailUpdate")
              : this.$t("snackbar.notificationsUpdate"),
            color: "success",
          });
        } catch (e) {
          await this.$store.commit("setSnackbar", {
            show: true,
            message: catchErrors(e),
            color: "error",
          });
        }
      }
    },

    async resendEmail() {
      try {
        await this.$store.dispatch("user/resendVerificationEmail");
        await this.$auth.fetchUser();
        await this.$store.commit("setSnackbar", {
          show: true,
          message: this.$t("snackbar.checkInbox"),
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

    openModal() {
      this.$store.commit("setModal", {
        show: true,
        type: "delete-account",
        data: {
          confirm: {
            function: () => {
              this.deleteAccount();
            },
          },
        },
      });
    },

    async deleteAccount() {
      try {
        await this.$store.dispatch("user/deleteAccount");
        await this.$auth.logout();
        await this.$store.commit("setSnackbar", {
          show: true,
          message: this.$t("snackbar.successDelete"),
          color: "normal",
        });
        await this.$router.push("/login");
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
@import "../../assets/scss/pages/settings";
</style>
