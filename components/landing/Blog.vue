<template>
  <div class="blog-wrapper">
    <div class="full-container">
      <h2 class="header-h">{{ $t("landing.blogTitle") }}</h2>

      <div class="content">
        <div class="blog-item">
          <span class="display-f">
            <img
              src="~/assets/img/landing/blog1.png"
              alt="blog-image"
              class="blog-img"
            />
          </span>

          <div class="info">
            <p class="text-m-bold no-color-link mtb">DD/MM/YY</p>
            <p class="header-title1 no-color-link mtb">
              NFT Collectibles: What are they?
            </p>
            <span class="divider"></span>
            <div class="action">
              <span class="text-m-bold no-color-link">{{
                $t("landing.readArticle")
              }}</span>
              <span>
                <img
                  src="~/assets/img/icons/arrow-up-right.svg"
                  alt="arrow-up-right"
                />
              </span>
            </div>
          </div>
        </div>

        <div class="blog-item">
          <span class="display-f">
            <img
              src="~/assets/img/landing/blog1.png"
              alt="blog-image"
              class="blog-img"
            />
          </span>

          <div class="info">
            <p class="text-m-bold no-color-link mtb">DD/MM/YY</p>
            <p class="header-title1 no-color-link mtb">
              NFT Collectibles: What are they?
            </p>
            <span class="divider"></span>
            <div class="action">
              <span class="text-m-bold no-color-link">{{
                $t("landing.readArticle")
              }}</span>
              <span>
                <img
                  src="~/assets/img/icons/arrow-up-right.svg"
                  alt="arrow-up-right"
                />
              </span>
            </div>
          </div>
        </div>

        <div class="blog-item">
          <span class="display-f">
            <img
              src="~/assets/img/landing/blog1.png"
              alt="blog-image"
              class="blog-img"
            />
          </span>

          <div class="info">
            <p class="text-m-bold no-color-link mtb">DD/MM/YY</p>
            <p class="header-title1 no-color-link mtb">
              NFT Collectibles: What are they?
            </p>
            <span class="divider"></span>
            <div class="action">
              <span class="text-m-bold no-color-link">{{
                $t("landing.readArticle")
              }}</span>
              <span>
                <img
                  src="~/assets/img/icons/arrow-up-right.svg"
                  alt="arrow-up-right"
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Blog",
};
</script>

<style lang="scss" scoped>
@import "assets/scss/components/landing/blog";
</style>
