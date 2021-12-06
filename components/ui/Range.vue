<template>
  <div class="range-wrapper">
    <p class="title text-s-bold mt-0 mb-24">
      {{ $t("marketplace.priceRange") }}
    </p>

    <div class="header">
      <span class="text-s"
        >{{ fixed(minValue) }}Ξ ({{ convertEthereum(minValue) }})
      </span>
      <span class="text-s"
        >{{ fixed(maxValue) }}Ξ ({{ convertEthereum(maxValue) }})
      </span>
    </div>

    <div class="track-container">
      <div ref="_vpcTrack" class="track"></div>
      <div ref="trackHighlight" class="track-highlight"></div>
      <button ref="track1" class="track-btn track1"></button>
      <button ref="track2" class="track-btn track2"></button>
    </div>

    <div class="show-counts mt-16">
      <div class="count-block">
        <p class="mtb text-s">{{ $t("marketplace.minPrice") }}</p>
        <p class="mtb text-m">
          Ξ {{ fixed(minValue) }} ({{ convertEthereum(minValue) }})
        </p>
      </div>
      <span class="small-divider">-</span>
      <div class="count-block">
        <p class="mtb text-s">{{ $t("marketplace.maxPrice") }}</p>
        <p class="mtb text-m">
          Ξ {{ fixed(maxValue) }} ({{ convertEthereum(maxValue) }})
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PriceRangeSlider",
  props: {
    minValue: {
      type: [Number, String],
      default: 0.43,
    },
    maxValue: {
      type: [Number, String],
      default: 5.41,
    },
  },

  data() {
    return {
      min: 0.43,
      max: 5.41,
      step: 0.1,
      totalSteps: 0,
      percentPerStep: 1,
      trackWidth: null,
      isDragging: false,
      pos: {
        curTrack: null,
      },
    };
  },

  computed: {
    convertEthereum() {
      return (price) => {
        const defEthr = 0.00022;
        const usd = +price / defEthr;
        return "$" + +usd.toFixed(2);
      };
    },
    fixed() {
      return (price) => (+price).toFixed(2);
    },
  },

  mounted() {
    this.totalSteps = (this.max - this.min) / this.step;
    this.percentPerStep = 100 / this.totalSteps;
    document.querySelector(".track1").style.left =
      this.valueToPercent(this.minValue) + "%";
    document.querySelector(".track2").style.left =
      this.valueToPercent(this.maxValue) + "%";
    this.setTrackHightlight();

    const self = this;

    ["mouseup", "mousemove"].forEach((type) => {
      document.body.addEventListener(type, (ev) => {
        if (self.isDragging && self.pos.curTrack) {
          self[type](ev, self.pos.curTrack);
        }
      });
    });

    [
      "mousedown",
      "mouseup",
      "mousemove",
      "touchstart",
      "touchmove",
      "touchend",
    ].forEach((type) => {
      document.querySelector(".track1").addEventListener(type, (ev) => {
        ev.stopPropagation();
        self[type](ev, "track1");
      });

      document.querySelector(".track2").addEventListener(type, (ev) => {
        ev.stopPropagation();
        self[type](ev, "track2");
      });
    });

    document.querySelector(".track").addEventListener("click", function (ev) {
      ev.stopPropagation();
      self.setClickMove(ev);
    });

    document
      .querySelector(".track-highlight")
      .addEventListener("click", function (ev) {
        ev.stopPropagation();
        self.setClickMove(ev);
      });
  },

  methods: {
    moveTrack(track, ev) {
      const percentInPx = this.getPercentInPx();

      const trackX = Math.round(
        this.$refs._vpcTrack.getBoundingClientRect().left
      );
      const clientX = ev.clientX;
      const moveDiff = clientX - trackX;

      const moveInPct = moveDiff / percentInPx;

      if (moveInPct < 1 || moveInPct > 100) return;
      const value =
        Math.round(moveInPct / this.percentPerStep) * this.step + this.min;
      if (track === "track1") {
        if (value >= this.maxValue - this.step) return;
        this.$emit("update:min-value", value);
      }

      if (track === "track2") {
        if (value <= this.minValue + this.step) return;
        this.$emit("update:max-value", value);
      }

      this.$refs[track].style.left = moveInPct + "%";
      this.setTrackHightlight();
    },
    mousedown(ev, track) {
      if (this.isDragging) return;
      this.isDragging = true;
      this.pos.curTrack = track;
    },

    touchstart(ev, track) {
      this.mousedown(ev, track);
    },

    mouseup(ev, track) {
      if (!this.isDragging) return;
      this.isDragging = false;
    },

    touchend(ev, track) {
      this.mouseup(ev, track);
    },

    mousemove(ev, track) {
      if (!this.isDragging) return;
      this.moveTrack(track, ev);
    },

    touchmove(ev, track) {
      this.mousemove(ev.changedTouches[0], track);
    },

    valueToPercent(value) {
      return ((value - this.min) / this.step) * this.percentPerStep;
    },

    setTrackHightlight() {
      this.$refs.trackHighlight.style.left =
        this.valueToPercent(this.minValue) + "%";
      this.$refs.trackHighlight.style.width =
        this.valueToPercent(this.maxValue) -
        this.valueToPercent(this.minValue) +
        "%";
    },

    getPercentInPx() {
      const trackWidth = this.$refs._vpcTrack.offsetWidth;
      const oneStepInPx = trackWidth / this.totalSteps;
      const percentInPx = oneStepInPx / this.percentPerStep;

      return percentInPx;
    },

    setClickMove(ev) {
      const track1Left = this.$refs.track1.getBoundingClientRect().left;
      const track2Left = this.$refs.track2.getBoundingClientRect().left;
      if (ev.clientX < track1Left) {
        this.moveTrack("track1", ev);
      } else if (ev.clientX - track1Left < track2Left - ev.clientX) {
        this.moveTrack("track1", ev);
      } else {
        this.moveTrack("track2", ev);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/ui/range";
</style>
