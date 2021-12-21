<template>
  <div class="panel-container">
    <div>
      <slot name="left"></slot>
    </div>
    <div class="main-content">
      <slot></slot>
    </div>
    <div>
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Panel",
};
</script>

<style lang="scss" scoped>
.panel-container {
  display: flex;
  width: 100%;
  align-content: space-between;
  justify-content: space-between;
  margin: 10px 0;
  align-items: center;
  background-color: #301c3f;
  flex-direction: row;
  border-radius: 3px;

  > * {
    margin: 0;
    padding: 16px;

    img {
      height: 100%;
      max-height: 100px;
    }
  }

  > .main-content {
    flex-grow: 1;
  }

  > :empty {
    display: none;
  }
}

@media (max-width: $break-sms) {
  .panel-container {
    flex-direction: column;

    > * {
      text-align: center;
      width: 100%;

      img {
        height: 150px;
        max-height: 150px;
      }
    }
  }
}
</style>
