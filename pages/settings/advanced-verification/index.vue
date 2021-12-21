<template>
  <div class="form-container full-h">
    <h1 class="header-title mb-24">
      {{ $t("settings.advancedVerification") }}
    </h1>

    <div class="content">
      <div class="form-group mb-24">
        <p class="mt-0 mb-16 text-m-bold">
          {{ $t("settings.accountSettings") }}
        </p>

        <Input
          class="mb-16"
          :type="'text'"
          :model.sync="firstName"
          :label="$t('settings.firstName')"
          :error="$v.firstName"
          :rules="rules.firstName"
          :is-submit="isSubmit"
        />

        <Input
          class="mb-16"
          :type="'text'"
          :model.sync="lastName"
          :label="$t('settings.lastName')"
          :error="$v.lastName"
          :rules="rules.lastName"
          :is-submit="isSubmit"
        />
      </div>

      <div class="form-group mb-24">
        <p class="mt-0 mb-16 text-m-bold">
          {{ $t("settings.countryRes") }}
        </p>

        <p v-if="countryError" class="text-s mt-0 mb-16 red">
          {{ $t("validations.selectOption") }}
        </p>

        <FilterDropdown
          :list="[
            { label: 'Option1', value: 1 },
            { label: 'Option2', value: 2 },
            { label: 'Option3', value: 3 },
            { label: 'Option4', value: 4 },
            { label: 'Option5', value: 5 },
          ]"
          :return-object="false"
          :item-value="'value'"
          :item-label="'label'"
          :name.sync="country"
          :placeholder="$t('settings.selectCountry')"
          class="mb-0"
        />
      </div>

      <div v-if="country" class="form-group mb-24">
        <p class="mt-0 mb-16 text-m-bold">
          {{ $t("settings.selectId") }}
        </p>

        <p v-if="idError" class="text-s mt-0 mb-16 red">
          {{ $t("validations.selectOption") }}
        </p>

        <RadioCircle
          class="mb-16"
          :name.sync="idType"
          :value="'id_card'"
          :label="'ID card'"
        />

        <RadioCircle
          class="mb-16"
          :name.sync="idType"
          :value="'driver_license'"
          :label="'Driver license'"
        />

        <RadioCircle
          :name.sync="idType"
          :value="'passport'"
          :label="'Passport'"
        />
      </div>

      <div class="form-group">
        <Button
          class="mb-24"
          :label="$t('settings.saveContinue')"
          :background="'primary'"
          :size="'full'"
          :color="'c-white'"
          @on-click="openModal"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import FilterDropdown from "../../../components/ui/FilterDropdown";
import RadioCircle from "../../../components/ui/RadioCircle";
import { catchErrors } from "../../../utils/catchErrors";
import Input from "./../../../components/ui/Input";
import Button from "./../../../components/ui/Button";
export default {
  name: "Index",
  components: {
    Input,
    Button,
    FilterDropdown,
    RadioCircle,
  },
  validations: {
    firstName: {
      required,
    },
    lastName: {
      required,
    },
  },
  layout: "auth",
  middleware: "auth",
  data() {
    return {
      firstName: "",
      lastName: "",
      country: "",
      idType: "",
      isSubmit: false,
      countryError: false,
      rules: {
        firstName: [
          { name: "required", text: this.$t("validations.notEmpty") },
        ],
        lastName: [{ name: "required", text: this.$t("validations.notEmpty") }],
      },
    };
  },

  computed: {
    isValid() {
      return !this.$v.$invalid && !this.countryError && !this.idError;
    },
  },

  watch: {
    country(val) {
      if (val) this.countryError = false;
    },
    idType(val) {
      if (val) this.idError = false;
    },
  },

  methods: {
    beforeUpdate() {
      this.isSubmit = true;

      if (!this.country) this.countryError = true;
      if (!this.idType) this.idError = true;
    },

    async openModal() {
      await this.beforeUpdate();

      if (this.isValid) {
        this.$store.commit("setModal", {
          show: true,
          type: "verify-id",
          data: {
            confirm: {
              function: () => {
                this.saveContinue();
              },
            },
          },
        });
      }
    },

    async saveContinue() {
      try {
        await this.$router.push("/settings");
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
@import "assets/scss/pages/settings";
</style>
