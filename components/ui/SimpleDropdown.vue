<template>
  <div :class="{ 'simple-dropdown': true, opened: opened }">
    <div class="title" @click="toggle">
      <slot name="title"></slot>
      <div class="arrow">
        <img src="~/assets/img/icons/caret-down.svg" alt="\/" />
      </div>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "SimpleDropdown",
  props: {
    openedByDefault: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      opened: this.openedByDefault,
    };
  },
  methods: {
    toggle(e) {
      this.opened = !this.opened;
    },
  },
};
</script>

<style lang="scss" scoped>
$animation-time: 1s;
$animation-function: ease-out;
$paddings: 12px;
$caret-size: 16px;

.simple-dropdown {
  .title {
    position: relative;
    border: 1px solid #261632;
    margin-bottom: 16px;
    padding: $paddings;
    cursor: pointer;

    .arrow {
      // transition: transform $animation-time $animation-function;
      position: absolute;
      top: $paddings;
      right: $paddings;

      img {
        transform: rotate(0);
        transform-origin: center center;
      }
    }
  }

  .content {
    overflow: hidden;
    background-color: #261632;
    // transition: height $animation-time $animation-function;
    // height: 0;
    display: none;
    padding: $paddings;
  }
}

.simple-dropdown.opened {
  .title .arrow img {
    transform: rotate(180deg);
  }

  .content {
    // height: auto;
    display: block;
  }
}
</style>
