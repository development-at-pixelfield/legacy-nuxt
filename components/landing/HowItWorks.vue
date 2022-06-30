<template>
  <div class="how-it-works">
    <div class="content full-container">
      <div class="title">How does it all work?</div>
      <div class="step-wrapper">
        <div v-for="(step, index) in steps" :key="`step_${index}`" class="step">
          <img
            :src="require(`~/assets/img/icons/landing-steps/${index + 1}.svg`)"
            alt=""
          />
          <div>
            {{ step.desc }}
          </div>
          <Button
            v-if="index === 0"
            class="coming-soon"
            :label="'COMING SOON'"
            :background="'white-outline'"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "~/components/ui/Button.vue";
export default {
  name: "HowItWorks",
  components: [Button],
  data() {
    return {
      steps: [
        {
          desc: "You create an account on our platform",
        },
        {
          desc: "You choose the personality/celebrity whose NFT you want to purchase",
        },
        {
          desc: "Make a simple purchase directly in the platform",
        },
        {
          desc: "You benefit from the advantages that your owned NFT offers",
        },
        {
          desc: "You experience personal successes together.",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/landing/how-it-works";
</style>
