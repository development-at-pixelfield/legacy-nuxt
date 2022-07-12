<template>
  <div class="blog-wrapper">
    <div class="tablet-container">
      <h2 class="header-h">{{ $t("landing.blogTitle") }}</h2>

      <div class="content">
        <!-- <div
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
        </div> -->

        <div class="blog-item">
          <a
            target="_blank"
            href="https://medium.com/@qubecryptospace/what-is-nft-and-why-is-it-so-popular-64b3ee62d86a"
          >
            <div class="blog-content">
              <span class="display-f">
                <img
                  src="https://miro.medium.com/max/1400/0*BrMlVx2dZc-90vgO.jpg"
                  alt="blog-image"
                  class="blog-img"
                />
              </span>

              <div class="info">
                <p class="text-s-bold no-color-link mtb date">Sep 14, 2021</p>
                <p class="title no-color-link mtb">
                  What Is NFT and Why Is It So Popular?
                </p>
              </div>
            </div>
          </a>
        </div>
        <div class="blog-item">
          <a
            target="_blank"
            href="https://nftdistrict.com/why-nfts-could-be-the-next-big-thing-for-the-content-industry-a217ee49d2cf"
          >
            <div class="blog-content">
              <span class="display-f">
                <img
                  src="https://miro.medium.com/max/1400/0*HC2cE8clA0pk-nrj"
                  alt="blog-image"
                  class="blog-img"
                />
              </span>

              <div class="info">
                <p class="text-s-bold no-color-link mtb date">Jan 19</p>
                <p class="title no-color-link mtb">
                  Why NFTs Could Be the Next Big Thing for the Content Industry
                </p>
              </div>
            </div>
          </a>
        </div>
        <div class="blog-item">
          <a
            target="_blank"
            href="https://medium.com/modadao/how-music-nfts-will-rewrite-the-streaming-economy-efe2da2e7fa7"
          >
            <div class="blog-content">
              <span class="display-f">
                <img
                  src="https://miro.medium.com/max/1400/0*s4yXQFgk_eQEnBBl"
                  alt="blog-image"
                  class="blog-img"
                />
              </span>

              <div class="info">
                <p class="text-s-bold no-color-link mtb date">Nov 30, 2021</p>
                <p class="title no-color-link mtb">
                  How Music NFTs Will Rewrite The Streaming Economy
                </p>
              </div>
            </div>
          </a>
        </div>
        <div class="blog-item">
          <a
            target="_blank"
            href="https://medium.com/the-capital/the-interesting-combination-of-sports-and-crypto-f64aafe56568"
          >
            <div class="blog-content">
              <span class="display-f">
                <img
                  src="https://miro.medium.com/max/1400/1*dCP_hjrNuVztzWHDODZqWw.png"
                  alt="blog-image"
                  class="blog-img"
                />
              </span>

              <div class="info">
                <p class="text-s-bold no-color-link mtb date">Jan 11</p>
                <p class="title no-color-link mtb">
                  The Interesting Combination Of Sports And Crypto
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
