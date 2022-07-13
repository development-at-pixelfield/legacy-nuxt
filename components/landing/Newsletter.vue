<template>
  <div class="newsletter">
    <div class="content tablet-container">
      <div class="title">
        Subscribe to our newsletter <br />so you don't miss any more news.
      </div>
      <div class="fields">
        <Input
          class="field"
          :label="'First name'"
          :model.sync="name"
          :error="$v.name"
          :rules="rules.name"
          :is-submit="isSubmit"
        />
        <Input
          class="field"
          :label="'Email'"
          :error="$v.email"
          :rules="rules.email"
          :custom-error="customErrors.email"
          :model.sync="email"
          :is-submit="isSubmit"
        />
      </div>
      <div class="languages">
        <div class="label">Send me emails in:</div>
        <div class="languages-wrapper">
          <div
            class="language-tile mx-24"
            :class="{ 'language-tile_active': language === 'cz' }"
            @click="language = 'cz'"
          >
            <img
              class="country-icon"
              src="~/assets/img/landing/flags/cz-circle.svg"
              alt=""
            />
            <div>čeština</div>
          </div>
          <div
            :class="{ 'language-tile_active': language === 'en' }"
            class="language-tile"
            @click="language = 'en'"
          >
            <img
              class="country-icon"
              src="~/assets/img/landing/flags/gb-circle.png"
              alt=""
            />
            <div>English</div>
          </div>
        </div>
      </div>
      <Checkbox
        :name.sync="agreePrivacy"
        class="mb-32"
        :error="checkPrivacyError"
      >
        <label slot="label" class="text-m">
          {{ $t("auth.agreeWith") }} &nbsp;
          <a
            href="https://storage.googleapis.com/galaxy-nft/Legacy%20Privacy%20Notice.pdf"
            target="_blank"
            class="no-color-link"
            @click.stop="() => {}"
            >{{ $t("auth.policy") }}</a
          >
        </label>
      </Checkbox>
      <Button :label="'Subscribe'" :color="'white'" @on-click="subscribe" />
    </div>
  </div>
</template>

<script>
import { email, required } from "vuelidate/lib/validators";
import Input from "~/components/ui/Input.vue";
import Button from "~/components/ui/Button.vue";
import Checkbox from "~/components/ui/Checkbox";

export default {
  name: "Newsletter",
  components: {
    Input,
    Button,
    Checkbox,
  },
  validations: {
    email: {
      required,
      email,
      checkEmailSymbol(email) {
        return email.includes("@");
      },
    },
    name: {
      required,
    },
  },
  data() {
    return {
      agreePrivacy: false,
      checkPrivacyError: "",
      name: "",
      email: "",
      language: "cz",
      isSubmit: false,
      customErrors: {
        email: [],
      },
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
        name: [{ name: "required", text: this.$t("validations.notEmpty") }],
      },
    };
  },
  watch: {
    agreePrivacy(val) {
      if (val) this.checkPrivacyError = "";
    },
  },
  methods: {
    async beforeUpdate() {
      await this.$v.$touch();
      this.isSubmit = true;
      this.customErrors.email = [];
      if (!this.agreePrivacy)
        this.checkPrivacyError = this.$t("validations.privacyAgree");
    },
    async subscribe() {
      await this.beforeUpdate();

      if (!this.$v.$invalid && this.agreePrivacy) {
        try {
          const payload = {
            name: this.name,
            email: this.email,
            language: this.language,
          };
          await this.$store.dispatch("landing/subscribe", payload);
          await this.$store.commit("setSnackbar", {
            show: true,
            message: this.$t("snackbar.successSubscription"),
            color: "success",
          });
        } catch (e) {
          if (
            e.response &&
            e.response.data.detail &&
            e.response.data.detail.includes("email")
          ) {
            const err = e.response.data.detail;
            const formatted = err[0].toUpperCase() + err.substring(1);
            this.customErrors.email.push({ text: formatted });
          }
          console.log(e);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/landing/newsletter";
</style>
