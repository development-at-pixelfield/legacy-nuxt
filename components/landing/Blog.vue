<template>
  <div class="blog-wrapper">
    <div class="tablet-container">
      <h2 class="header-h">{{ $t("landing.blogTitle") }}</h2>

      <div class="content">
        <div
          v-for="(blog, index) in blogs.slice(0, 4)"
          :key="`blog_${index}`"
          class="blog-item"
        >
          <a target="_blank" :href="blog.url">
            <div class="blog-content">
              <span class="display-f">
                <img
                  :src="blogImage(blog.thumbnail)"
                  alt="blog-image"
                  class="blog-img"
                />
              </span>

              <div class="info">
                <p class="text-s-bold no-color-link mtb date">
                  {{ formatDate(blog.blog_date) }}
                </p>
                <p class="title no-color-link mtb">
                  {{ blog.title }}
                </p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Blog",
  props: {
    blogs: {
      type: Array,
      required: true,
    },
  },
  computed: {
    formatDate() {
      return (date) => {
        const options = {
          year: "2-digit",
          day: "2-digit",
          month: "2-digit",
        };
        const d = new Date(date).toLocaleString("en", options);
        return String(d).split(",")[0];
      };
    },
    blogImage() {
      return (image) => {
        if (image.includes("cdn-images")) {
          return image;
        }
        return require("~/assets/img/default-blog-img.png");
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/components/landing/blog";
</style>
