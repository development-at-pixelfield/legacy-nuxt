<template>
  <div class="auth-container">
    <h1 class="header-big mt-0 mb-24">{{ $t("auth.register") }}</h1>
    <div class="form-group mb-24">
      <Input
        :type="'email'"
        :model.sync="email"
        :label="$t('auth.email')"
        :error="$v.email"
        :rules="rules.email"
        :is-submit="isSubmit"
      />

      <Input
        :type="inputTypePassword"
        :model.sync="password"
        :label="$t('auth.password')"
        :icon="inputIconPassword"
        :level="level"
        :with-indicator="true"
        :custom-error="customErrors"
        :error="$v.password"
        :rules="rules.password"
        :help-text="$t('auth.passwordRule')"
        :is-submit="isSubmit"
        @icon-click="iconClick('password')"
      />

      <Input
        :type="inputTypeRepeat"
        :model.sync="repeatPassword"
        :label="$t('auth.repeatPassword')"
        :error="$v.repeatPassword"
        :rules="rules.repeatPassword"
        :icon="inputIconRepeat"
        :is-submit="isSubmit"
        @icon-click="iconClick('repeat')"
      />
    </div>

    <div class="form-group">
      <Checkbox :name.sync="agree" class="mb-32" :error="checkError">
        <label slot="label" class="text-m">
          {{ $t("auth.agreeWith") }} &nbsp;
          <nuxt-link to="/" class="no-color-link">{{
            $t("auth.termCond")
          }}</nuxt-link>
        </label>
      </Checkbox>

      <Button
        class="mb-24"
        :label="$t('auth.register')"
        :background="'primary'"
        :size="'full'"
        :color="'c-white'"
        @on-click="register"
      />

      <nuxt-link to="/login" class="no-color-dec-link center-block text-btn">{{
        $t("auth.alreadyLoggedIn")
      }}</nuxt-link>
    </div>

    <FooterLinks />
  </div>
</template>

<script>
import { required, sameAs, email } from "vuelidate/lib/validators";
import Input from "../../components/ui/Input";
import Checkbox from "../../components/ui/Checkbox";
import Button from "../../components/ui/Button";
import passwordValidate from "../../mixins/passwordValidate";
import FooterLinks from "../../components/footer/FooterLinks";
import { catchErrors } from "../../utils/catchErrors";
import isLoggedIn from "../../middleware/isLoggedIn";
export default {
  name: "Index",
  components: {
    Input,
    Checkbox,
    Button,
    FooterLinks,
  },
  mixins: [passwordValidate],
  middleware: [isLoggedIn],
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
    },
    repeatPassword: {
      required,
      sameAsPassword: sameAs("password"),
    },
  },
  data() {
    return {
      email: "",
      password: "",
      repeatPassword: "",
      agree: false,
      isSubmit: false,
      checkError: "",
      rules: {
        email: [
          { name: "required", text: this.$t("validations.notEmpty") },
          {
            name: "email",
            text: this.$t("validations.addEmail"),
          },
        ],
        password: [{ name: "required", text: this.$t("validations.notEmpty") }],
        repeatPassword: [
          { name: "required", text: this.$t("validations.notEmpty") },
          {
            name: "sameAsPassword",
            text: this.$t("validations.sameAsPassword"),
          },
        ],
      },
    };
  },

  computed: {
    isValid() {
      return !this.$v.$invalid && !this.customErrors.length && !this.checkError;
    },
  },

  watch: {
    agree(val) {
      if (val) this.checkError = "";
    },
  },

  methods: {
    async beforeUpdate() {
      await this.$v.$touch();

      this.isSubmit = true;
      if (!this.agree) this.checkError = this.$t("validations.termAgree");
    },

    async register() {
      await this.beforeUpdate();

      if (this.isValid) {
        try {
          const data = {
            email: this.email,
            password: this.password,
          };
          await this.$store.dispatch("user/registerUser", data);
          await this.$auth.loginWith("local", {
            data: {
              email: this.email,
              password: this.password,
            },
          });

          await this.$store.commit("setSnackbar", {
            show: true,
            message: this.$t("snackbar.successRegister"),
            color: "success",
          });
          await this.$router.push("/profile");
        } catch (e) {
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
@import "assets/scss/pages/auth.scss";
</style>
