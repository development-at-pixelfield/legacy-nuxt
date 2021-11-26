<template>
  <div class="coming-soon">
    <div id="stars" class="stars"></div>

    <div id="app-content" class="app-content">
      <div id="banner" class="main-banner"></div>
      <Timer class="timer" />
    </div>
  </div>
</template>

<script>
import Timer from "./Timer";
export default {
  name: "ComingSoon",
  components: {
    Timer,
  },
  mounted() {
    document.addEventListener("mousemove", this.parallax);
    document.addEventListener("touchmove", this.parallax);
  },

  beforeDestroy() {
    document.removeEventListener("mousemove", this.parallax);
    document.removeEventListener("touchmove", this.parallax);
  },

  methods: {
    parallax(e) {
      const elem = document.querySelector("#stars");
      const _w = window.innerWidth / 2;
      const _h = window.innerHeight / 2;
      const _mouseX = e.clientX ? e.clientX : e.touches[0].clientX;
      const _mouseY = e.clientY ? e.clientY : e.touches[0].clientY;
      const _depth1 = `${50 - (_w - _mouseX) * 0.01}% ${
        50 - (_h - _mouseY) * 0.01
      }%`;
      const _depth2 = `${50 - (_w - _mouseX) * 0.02}% ${
        50 - (_h - _mouseY) * 0.02
      }%`;
      const _depth3 = `${50 - (_w - _mouseX) * 0.06}% ${
        50 - (_h - _mouseY) * 0.06
      }%`;
      const x = `${_depth3}, ${_depth2}, ${_depth1}`;
      elem.style.backgroundPosition = x;

      this.banner(e);
    },

    banner(e) {
      const elemBanner = document.querySelector("#banner");
      const _w = window.innerWidth / 2;
      const _h = window.innerHeight / 2;
      const _mouseX = e.clientX ? e.clientX : e.touches[0].clientX;
      const _mouseY = e.clientY ? e.clientY : e.touches[0].clientY;
      const _depthT1 = `${0 - (_mouseX - _w) * 0.03}`;
      const _depthT2 = `${25 - (_mouseY - _h) * 0.03}`;
      elemBanner.style.transform =
        "translate(" + _depthT1 + "px," + _depthT2 + "px)";
      elemBanner.style.transition = "all 0.2s";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/components/landing/coming-soon";
</style>
