<template>
  <div v-if="leaders && leaders.length" class="leaderboard">
    <div class="leaderboard-track">
      <div class="leaderboard-single">
        <span>🚀 {{ $t("profile.leaderboard") }}</span>
      </div>
      <div
        v-for="(leader, index) in leaders.slice(0, 9)"
        :key="leader.username + index"
        class="leaderboard-single"
      >
        <span v-if="index == 0"
          >🏆🏆🏆 {{ leader.username }} ({{ leader.nft_tokens }})</span
        >
        <span v-if="index == 1"
          >🏆🏆 {{ leader.username }} ({{ leader.nft_tokens }})</span
        >
        <span v-if="index == 2"
          >🏆 {{ leader.username }} ({{ leader.nft_tokens }})</span
        >
        <span v-if="index > 2"
          >✨ {{ leader.username }} ({{ leader.nft_tokens }})</span
        >
      </div>
      <div class="leaderboard-single">
        <span>🚀 {{ $t("profile.leaderboard") }}</span>
      </div>
      <div
        v-for="(leader, index) in leaders.slice(0, 9)"
        :key="leader.username + index + 10"
        class="leaderboard-single"
      >
        <span v-if="index == 0"
          >🏆🏆🏆 {{ leader.username }} ({{ leader.nft_tokens }})</span
        >
        <span v-if="index == 1"
          >🏆🏆 {{ leader.username }} ({{ leader.nft_tokens }})</span
        >
        <span v-if="index == 2"
          >🏆 {{ leader.username }} ({{ leader.nft_tokens }})</span
        >
        <span v-if="index > 2"
          >✨ {{ leader.username }} ({{ leader.nft_tokens }})</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Leaderboard",
  data() {
    return {
      mountains: [],
      leaders: [],
    };
  },
  async fetch() {
    const leaders = await this.$store.dispatch("nfts/getLeaderboard");
    this.leaders = leaders.results;
  },
  computed: {
    userAvatar() {
      return require("~/assets/img/header-logo.svg");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/components/header/leaderboard";
</style>
