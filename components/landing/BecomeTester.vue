<template>
  <div id="become-tester" class="become-tester">
    <div class="content full-container">
      <div class="mt-0 header-block">
        <span class="header-h">{{ $t("landing.becomeTesterTitle") }}</span>
        <p class="header-desc no-color-link">
          {{ $t("landing.becomeTesterDesc") }}
        </p>
      </div>
      <div class="form-group">
        <div class="item">
          <span class="item-img">
            <img src="~/assets/img/landing/nft-featured.png" alt="bear-image" />
          </span>

          <div class="info">
            <p class="no-color-link header-title1 mb-16 mt-24 text-center">
              Athlete Legends
            </p>

            <div class="action center-block">
              <Button
                :label="$t('landing.availableNow')"
                :background="'primary'"
                :size="'medium'"
                :color="'c-white'"
                @on-click="$router.push('/marketplace')"
              />
            </div>
          </div>
        </div>

        <div class="item">
          <span class="item-img">
            <img src="~/assets/img/landing/nft-featured.png" alt="bear-image" />
          </span>

          <div class="info">
            <p class="no-color-link header-title1 mb-16 mt-24 text-center">
              Athlete Legends
            </p>

            <div class="action center-block">
              <Button
                :label="$t('landing.availableNow')"
                :background="'primary'"
                :size="'medium'"
                :color="'c-white'"
                @on-click="$router.push('/marketplace')"
              />
            </div>
          </div>
        </div>

        <div class="item">
          <span class="item-img">
            <img src="~/assets/img/landing/nft-featured.png" alt="bear-image" />
          </span>

          <div class="info">
            <p class="no-color-link header-title1 mb-16 mt-24 text-center">
              Athlete Legends
            </p>

            <div class="action center-block">
              <Button
                :label="$t('landing.availableNow')"
                :background="'primary'"
                :size="'medium'"
                :color="'c-white'"
                @on-click="$router.push('/marketplace')"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "../ui/Button";
export default {
  name: "BecomeTester",
  components: {
    Button,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/components/landing/become-tester";
</style>
