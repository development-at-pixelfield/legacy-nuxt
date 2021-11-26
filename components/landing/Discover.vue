<template>
  <div id="discover" class="discover-wrapper">
    <div class="discover">
      <div class="left-side">
        <h2 class="mt-0">
          {{ $t("landing.discoverTitle") }}
        </h2>
        <p class="mb-0 text-l">
          {{ $t("landing.discoverDesc") }}
        </p>
      </div>
      <div class="right-side">
        <span class="img-block">
          <img class="bear-img" src="~/assets/img/bear-front.png" alt="bear" />
        </span>
      </div>
    </div>

    <div class="sounds">
      <div class="left-side">
        <span class="start-block">
          <img src="~/assets/img/landing/sounds-start.svg" alt="star" />
        </span>
        <div class="sound-block">
          <h2>{{ $t("landing.soundGood") }}</h2>
          <p class="mt-0 mb-24 title-big">{{ $t("landing.joinUsDiscord") }}</p>
          <div class="action">
            <a href="" class="discord-btn">
              <img
                src="~/assets/img/icons/discord-big.svg"
                alt="discord-icon"
              />
            </a>
          </div>
          <p class="mb-24 mt-0 text-m">{{ $t("landing.orJoin") }}</p>
          <ul class="mtb">
            <li>
              <a href="" class="social-link">
                <Icon src="facebook-negative.svg" size="big"></Icon>
              </a>
            </li>
            <li>
              <a href="" class="social-link">
                <Icon src="twitter-negative.svg" size="big"></Icon>
              </a>
            </li>
            <li>
              <a href="" class="social-link">
                <Icon src="instagram-negative.svg" size="big"></Icon>
              </a>
            </li>
            <li>
              <a href="" class="social-link">
                <Icon src="telegram-negative.svg" size="big"></Icon>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="right-side">
        <div class="desktop-sound">
          <div class="first-column column">
            <span class="img-block odd">
              <img src="~/assets/img/landing/desktop-img1.svg" alt="image1" />
            </span>
            <span class="img-block">
              <img src="~/assets/img/landing/desktop-img3.svg" alt="image3" />
            </span>
          </div>
          <div class="second-column column">
            <span class="img-block odd">
              <img src="~/assets/img/landing/desktop-img2.svg" alt="image2" />
            </span>
            <span class="img-block">
              <img src="~/assets/img/landing/desktop-img4.svg" alt="image4" />
            </span>
          </div>
        </div>

        <div class="mobile-sound">
          <div class="first-column column">
            <span class="img-block odd">
              <img src="~/assets/img/landing/mobile-img1.svg" alt="image1" />
            </span>
            <span class="img-block">
              <img src="~/assets/img/landing/mobile-img3.svg" alt="image3" />
            </span>
          </div>
          <div class="second-column column">
            <span class="img-block odd">
              <img src="~/assets/img/landing/mobile-img2.svg" alt="image2" />
            </span>
            <span class="img-block">
              <img src="~/assets/img/landing/mobile-img4.svg" alt="image4" />
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Discover",
};
</script>

<style lang="scss" scoped>
@import "assets/scss/components/landing/discover";
</style>
