<template>
  <div id="become-tester" class="become-tester">
    <div class="content">
      <div class="mt-0 header-block">
        <span class="rocket-icon">🚀</span>
        <span class="header-h">{{ $t("landing.becomeTesterTitle") }}</span>
      </div>
      <div class="form-group">
        <Input
          class="mb-24"
          :model.sync="name"
          :header="$t('landing.name')"
          :label="$t('landing.name')"
          :error="$v.name"
          :rules="rules.name"
          :is-submit="isSubmit"
        />

        <Input
          :model.sync="email"
          :header="$t('auth.email')"
          :label="$t('auth.email')"
          :error="$v.email"
          :rules="rules.email"
          :is-submit="isSubmit"
          :custom-error="customEmailErrors"
        />

        <div class="action center-block">
          <Button
            class="mt-32"
            :label="$t('landing.signUp')"
            :background="'primary'"
            :size="'medium'"
            :color="'c-white'"
            @on-click="submitTester"
          >
            <span slot="icon" class="ml-4 emoji">😎</span>
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
import { catchErrors } from "../../utils/catchErrors";
import Input from "../ui/Input";
export default {
  name: "BecomeTester",
  components: {
    Input,
  },
  validations: {
    name: {
      required,
    },
    email: {
      required,
      email,
    },
  },
  data() {
    return {
      name: "",
      email: "",
      customEmailErrors: {},
      isSubmit: false,
      rules: {
        name: [{ name: "required", text: this.$t("validations.notEmpty") }],
        email: [
          {
            name: "email",
            text: this.$t("validations.addEmail"),
          },
          {
            name: "required",
            text: this.$t("validations.notEmpty"),
          },
        ],
      },
    };
  },
  computed: {
    isValid() {
      return !this.$v.$invalid && !this.customEmailErrors.length;
    },
  },
  methods: {
    async submitTester() {
      await this.$v.$touch();
      this.isSubmit = true;
      if (this.isValid) {
        try {
          const data = {
            email: this.email,
            name: this.name,
          };
          await this.$store.dispatch("user/submitTester", data);
          await this.$store.commit("setSnackbar", {
            show: true,
            message: this.$t("snackbar.successTester"),
            color: "success",
          });
        } catch (e) {
          // if (e.response.data.detail === "Already registered") {
          //   this.customEmailErrors = {
          //     errors: ["This email has already been used"],
          //     type: "object",
          //   };
          //   return;
          // }
          await this.$store.commit("setSnackbar", {
            show: true,
            message: catchErrors(e),
            color: "error",
          });
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/components/landing/become-tester";
</style>
