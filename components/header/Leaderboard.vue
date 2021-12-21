<template>
  <div class="leaderboard">
    <div class="leaderboard-track">
      <div class="leaderboard-single">
        <span>🚀 Largest collections:</span>
      </div>
      <div class="leaderboard-single">
        <span>🏆🏆🏆 Sam_00 (4)</span>
      </div>
      <div class="leaderboard-single">
        <span>🏆🏆 {username} (number)</span>
      </div>
      <div class="leaderboard-single">
        <span>🏆 {username} (number)</span>
      </div>
      <div class="leaderboard-single">
        <span>✨ {username} (number)</span>
      </div>
      <div class="leaderboard-single">
        <span>✨ {username} (number)</span>
      </div>
      <div class="leaderboard-single">
        <span>✨ {username} (number)</span>
      </div>
      <div class="leaderboard-single">
        <span>✨ {username} (number)</span>
      </div>
      <div class="leaderboard-single">
        <span>✨ {username} (number)</span>
      </div>
      <div class="leaderboard-single">
        <span>✨ {username} (number)</span>
      </div>
      <div class="leaderboard-single">
        <span>🚀 Largest collections:</span>
      </div>
      <div class="leaderboard-single">
        <span>🏆🏆🏆 Sam_00 (4)</span>
      </div>
      <div class="leaderboard-single">
        <span>🏆🏆 {username} (number)</span>
      </div>
      <div class="leaderboard-single">
        <span>🏆 {username} (number)</span>
      </div>
      <div class="leaderboard-single">
        <span>✨ {username} (number)</span>
      </div>
      <div class="leaderboard-single">
        <span>✨ {username} (number)</span>
      </div>
      <div class="leaderboard-single">
        <span>✨ {username} (number)</span>
      </div>
      <div class="leaderboard-single">
        <span>✨ {username} (number)</span>
      </div>
      <div class="leaderboard-single">
        <span>✨ {username} (number)</span>
      </div>
      <div class="leaderboard-single">
        <span>✨ {username} (number)</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Leaderboard",
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
