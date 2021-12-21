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

      <div v-if="!country" class="form-group mb-24">
        <p class="mt-0 mb-16 text-m-bold">
          {{ $t("settings.selectId") }}
        </p>

        <RadioCircle
          :name.sync="idType"
          :radio-name="'id-type'"
          :value="'id_cart'"
        >
          <label slot="label" class="text-semi-l"> Test1 </label>
        </RadioCircle>

        <RadioCircle
          :name.sync="idType"
          :radio-name="'id-type'"
          :value="'driver_license'"
        >
          <label slot="label" class="text-semi-l"> Test2 </label>
        </RadioCircle>

        <RadioCircle
          :name.sync="idType"
          :radio-name="'id-type'"
          :value="'passport'"
        >
          <label slot="label" class="text-semi-l"> Test3 </label>
        </RadioCircle>
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
    country: {
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
      rules: {
        firstName: [
          { name: "required", text: this.$t("validations.notEmpty") },
        ],
        lastName: [{ name: "required", text: this.$t("validations.notEmpty") }],
        country: [
          { name: "required", text: this.$t("validations.selectOption") },
        ],
      },
    };
  },

  methods: {
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

    saveContinue() {},
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/pages/settings";
</style>
