<template>
  <div class="image-with-title">
    <img
      :src="imgSrc"
      :alt="imgAlt"
      :style="{
        width: imgWidth,
        height: imgHeight,
      }"
    />
    <div class="title" v-if="title.length > 0">
      {{ title }}
    </div>
  </div>
</template>

<script>
export default {
  name: "ImageWithTitle",
  props: {
    imgAlt: {
      type: String,
      required: false,
      default: "",
    },
    title: {
      type: String,
      required: false,
      default: "",
    },
    imgWidth: {
      type: String,
      required: false,
      default: "auto",
    },
    imgHeight: {
      type: String,
      required: false,
      default: "auto",
    },
    imgSrc: {
      type: String,
      required: true,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
.image-with-title {
  display: inline-block;

  img {
    display: block;
  }
  div.title {
    display: block;
    max-width: 100%;
    text-align: center;
    font-size: smaller;
  }
}
</style>
