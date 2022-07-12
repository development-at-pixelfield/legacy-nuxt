<template>
  <div class="purchase-benefits">
    <div class="content tablet-container">
      <div class="title">
        Purchasing an NFT card gives you many great benefits
      </div>
      <div class="card-wrapper">
        <div v-for="(card, index) in cards" :key="`card_${index}`" class="card">
          <img
            v-if="index !== cards.length - 1"
            class="icon"
            src="~/assets/img/icons/purchase-check.png"
            alt=""
          />
          <div>
            {{ card }}
          </div>
        </div>
      </div>
      <div class="celebrity-note">
        <i>
          With each celebrity we have arranged individual rewards for NFT
          owners, details can be found in the description of each card.</i
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PurchaseBenefits",
  data() {
    return {
      cards: [
        "On-line meet up with celebrities",
        "Personal & group on-line meetings",
        "Dinner with a celebrities",
        "Exclusive competitions for tickets and merch",
        "Private group for communication with the celebrities",
        "And much more!",
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/landing/purchase-benefits";
</style>
