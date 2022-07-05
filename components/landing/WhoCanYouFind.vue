<template>
  <div class="who-find">
    <div class="content full-container">
      <div class="title">Who can you find on our platform?</div>
      <div class="subtitle">
        With the help of sports agents and artistic managers, we establish
        collaborations with celebrities across the globe.
      </div>
      <div class="card-wrapper">
        <div
          v-for="(card, index) in cards"
          :key="`card-${index}`"
          :class="`card_${card.background}`"
          class="card"
        >
          <img class="icon" :src="card.icon" alt="" />
          <div class="title">{{ card.title }}</div>
          <div class="subtitle">{{ card.subtitle }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WhoCanYouFind",
  data() {
    return {
      cards: [
        {
          icon: require("~/assets/img/icons/who-find/red.png"),
          background: "red",
          title: "Rising Star",
          subtitle:
            "A person at the beginning of his/her career with great potential for success. We support the journey towards their dream destination.",
        },
        {
          icon: require("~/assets/img/icons/who-find/blue.png"),
          background: "blue",
          title: "Elite",
          subtitle:
            "A well-known personality who has retired from his/her career, but still wants to be as close to his/her loyal fans as possible.",
        },
        {
          icon: require("~/assets/img/icons/who-find/yellow.png"),
          background: "yellow",
          title: "Legend",
          subtitle:
            "A well-known personality who has retired from his/her career, but still wants to be as close to his/her loyal fans as possible.",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/components/landing/who-can-you-find";
</style>
