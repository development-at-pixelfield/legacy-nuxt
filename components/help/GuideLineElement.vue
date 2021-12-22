<template>
  <div class="guideline-element">
    <div class="title">
      <div class="number">
        {{ number }}
      </div>
      <div class="title-text">
        <slot name="title"></slot>
      </div>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "GuideLineElement",
  props: {
    number: {
      type: [String, Number],
      required: false,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
$paddings: 10px;
$number-size: 16px;

.guideline-element {
  .title {
    display: flex;
    align-items: center;
    flex-direction: row;
    margin: ($paddings / 2) 0;
    width: 100%;

    .number {
      padding: 0;
      width: $number-size;
      height: $number-size;
      border-radius: $number-size / 2;
      background-color: #8933cd;
      line-height: $number-size;
      text-align: center;
      font-size: $number-size / 2;
      min-width: $number-size;
    }
    .title-text {
      flex-grow: 1;
      padding-left: $paddings;
    }
  }
  .content {
    margin-left: $number-size / 2;
    border-left: 1px solid #8933cd;
    padding-left: $number-size / 2 + $paddings;
    margin-top: $paddings / 2;
    margin-bottom: $paddings / 2;
    padding-top: $paddings / 2;
    padding-bottom: $paddings / 2;
  }
}
</style>
