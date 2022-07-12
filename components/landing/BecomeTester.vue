<template>
  <div id="become-tester" class="become-tester">
    <div class="content tablet-container">
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
        <!-- <div
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
                @on-click="toMarketplaceCollection(collection)"
              />
            </div>
          </div>
        </div> -->
        <div class="item">
          <span class="item-img">
            <img src="@/assets/img/landing/Malikova-min.png" alt="bear-image" />
          </span>
          <div class="info">
            <p class="no-color-link header-title1 mb-16 mt-24 text-center">
              Rising Stars
            </p>
          </div>
        </div>
        <div class="item">
          <span class="item-img">
            <img src="@/assets/img/landing/Dano-min.png" alt="bear-image" />
          </span>
          <div class="info">
            <p class="no-color-link header-title1 mb-16 mt-24 text-center">
              Elite
            </p>
          </div>
        </div>
        <div class="item">
          <span class="item-img">
            <img src="@/assets/img/landing/Kuzmina-min.png" alt="bear-image" />
          </span>
          <div class="info">
            <p class="no-color-link header-title1 mb-16 mt-24 text-center">
              Legend
            </p>
          </div>
        </div>
      </div>
      <div class="category-h">
        <div class="category">Great Actors & Singers</div>
        <Button :label="'COMING SOON'" :background="'white-outline'" />
      </div>
      <div class="blur_images">
        <img
          class="blurred-image"
          src="~/assets/img/landing/blur_one.png"
          alt=""
        />
        <img
          class="blurred-image"
          src="~/assets/img/landing/blur_two.png"
          alt=""
        />
        <img
          class="blurred-image"
          src="~/assets/img/landing/blur_three.png"
          alt=""
        />
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
  props: {
    collections: {
      type: Array,
      required: true,
    },
  },
  computed: {
    getConstellationImage() {
      return (thumbnail) => {
        return thumbnail ?? require("~/assets/img/landing/nft-featured.png");
      };
    },
  },
  methods: {
    toMarketplaceCollection(collection) {
      this.$router.push(
        `/marketplace/collection__in=${collection.id}&page=1&ordering=-deployed_at`
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/components/landing/become-tester";
</style>
