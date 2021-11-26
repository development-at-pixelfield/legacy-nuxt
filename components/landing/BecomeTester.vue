<template>
  <div id="become-tester" class="become-tester">
    <div class="content">
      <div class="mt-0 header-block">
        <span class="rocket-icon">🚀</span>
        <h2>Become a tester</h2>
      </div>
      <div class="form-group">
        <Input
          class="mb-24"
          :model.sync="name"
          :header="$t('landing.name')"
          :label="$t('landing.name')"
          :error="$v.name"
          :rules="rules.name"
        />
        <Input
          :model.sync="email"
          :header="$t('auth.email')"
          :label="$t('auth.email')"
          :error="$v.email"
          :rules="rules.email"
        />

        <div class="action center-block">
          <Button
            class="mt-32"
            :label="$t('landing.signUp')"
            :background="'primary'"
            :size="'medium'"
            :color="'c-white'"
            @on-click="$router.push('/register')"
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
      rules: {
        name: [{ name: "required", text: this.$t("validations.notEmpty") }],
        email: [
          {
            name: "required",
            text: this.$t("validations.notEmpty"),
          },
        ],
      },
    };
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/components/landing/become-tester";
</style>
