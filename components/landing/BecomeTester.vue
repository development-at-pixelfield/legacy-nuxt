<template>
  <div id="become-tester" class="become-tester">
    <div class="content full-container">
      <div class="mt-0 header-block">
        <span class="header-h">{{ $t("landing.becomeTesterTitle") }}</span>
        <p class="header-desc no-color-link">
          {{ $t("landing.becomeTesterDesc") }}
        </p>
      </div>
      <span class="category-h"
        ><div class="category">Sport</div>
        <Button :label="'AVAILABLE NOW'" :background="'available'"
      /></span>
      <div class="form-group">
        <div
          v-for="(collection, index) in collections"
          :key="`collection_${index}`"
          class="item"
        >
          <span class="item-img">
            <img
              :src="getConstellationImage(collection.thumbnail)"
              alt="bear-image"
            />
          </span>

          <div class="info">
            <p class="no-color-link header-title1 mb-16 mt-24 text-center">
              {{ collection.name }}
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
      <div class="category-h">
        <div class="category">Great Actors & Singers</div>
        <Button :label="'COMING SOON'" :background="'white-outline'" />
      </div>
      <img
        class="blurred-image"
        src="~/assets/img/landing/actors-blurred.png"
        alt=""
      />
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
  props: {
    collections: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    getConstellationImage() {
      return (thumbnail) => {
        return thumbnail ?? require("~/assets/img/landing/nft-featured.png");
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/components/landing/become-tester";
</style>
