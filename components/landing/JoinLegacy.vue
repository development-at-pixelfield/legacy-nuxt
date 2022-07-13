<template>
  <div class="discover-wrapper">
    <div class="discover">
      <div class="full-container">
        <div class="left-side">
          <h2 class="mt-0 no-color-link">
            {{ $t("landing.joinTitle") }}
          </h2>
          <p
            class="mb-0 text-m desc"
            :inner-html.prop="$t('landing.joinDesc')"
          ></p>
        </div>
        <div class="right-side">
          <div class="info-item purple">
            <img src="~/assets/img/landing/heart.png" alt="heart" />

            <div class="info">
              <p class="title">{{ $t("landing.joinItem1") }}</p>
              <p class="mtb no-color-link text-m">
                {{ $t("landing.joinItemDesc1") }}
              </p>
            </div>
          </div>

          <div class="info-item yellow">
            <img src="~/assets/img/landing/star.png" alt="star" />

            <div class="info">
              <p class="title">{{ $t("landing.joinItem2") }}</p>
              <p class="mtb no-color-link text-m">
                {{ $t("landing.joinItemDesc2") }}
              </p>
            </div>
          </div>

          <div class="info-item blue">
            <img src="~/assets/img/landing/award.png" alt="award" />

            <div class="info">
              <p class="title">{{ $t("landing.joinItem3") }}</p>
              <p class="mtb no-color-link text-m">
                {{ $t("landing.joinItemDesc3") }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "JoinLegacy",
};
</script>

<style lang="scss" scoped>
@import "assets/scss/components/landing/join-legacy";
</style>
