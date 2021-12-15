<template>
  <div class="marketplace-detail">
    <div class="header">
      <div class="main-container">
        <Navigation
          :title="$t('marketplace.marketplace')"
          :custom-link="'/marketplace'"
          :with-query="true"
          class="nav"
        />
        <div class="img-block">
          <WebGl :src="nfts.model_file" />
        </div>
      </div>
    </div>

    <div class="main-container">
      <div class="detail">
        <div class="main-info block-margin">
          <div class="left-side">
            <h1 class="mb-8 mt-0 detail-title">{{ nfts.name }}</h1>
            <span class="header-title1">Current price: 107.50Ξ</span>
            <span class="header-title1 ml-16">{{ convertEthereum(50) }}</span>
          </div>

          <div class="right-side">
            <div v-if="true" class="sold-action">
              <div class="left-side-s">
                <span class="img-block-s">
                  <img
                    src="~/assets/img/auction.png"
                    alt="auction"
                    class="img-s"
                  />
                </span>

                <div>
                  <p class="mtb text-m-bold">Current owner</p>
                  <p class="mtb text-m-bold">Username</p>
                </div>
              </div>

              <div class="right-side-s">
                <Button
                  class="single-btn"
                  :label="$t('marketplace.buyNow')"
                  :background="'disabled-new'"
                  :size="'medium'"
                  :tooltip="'Community re-listing coming soon!'"
                />
              </div>
            </div>

            <div v-else class="action">
              <Button
                v-if="showCard"
                class="first-btn"
                :label="$t('marketplace.payCard')"
                :background="'ghost'"
                :size="'medium'"
                :color="'c-white'"
                @on-click="payCard"
              >
                <span slot="left-icon" class="mr-8 display-f">
                  <img
                    src="~/assets/img/icons/credit-card.svg"
                    alt="credit-card"
                  />
                </span>
              </Button>
              <Button
                class="second-btn"
                :label="$t('marketplace.buyNow')"
                :background="'primary'"
                :size="'medium'"
                :color="'c-white'"
                @on-click="buyNow"
              >
                <span slot="left-icon" class="mr-8 display-f">
                  <img src="~/assets/img/icons/wallet.svg" alt="credit-card" />
                </span>
              </Button>
            </div>
          </div>
        </div>

        <div v-if="showAuction" class="auction block-margin">
          <div class="left-side">
            <div class="img-block">
              <img src="~/assets/img/auction.png" alt="auction" />
            </div>
            <div class="info">
              <p class="mt-0 mb-4 header-title1">Dutch auction</p>
              <p class="mtb text-m-bold">
                This NFT is sold through a dutch auction, which means that
                whoever buys it first for the current price becomes the owner.
              </p>
            </div>
          </div>

          <div class="right-side">
            <div class="text">
              <span class="display-f">
                <img src="~/assets/img/icons/bell.svg" alt="bell" />
              </span>
              <span class="text-m-bold valid-text"
                >The current price is valid for</span
              >
            </div>
            <div class="timer text-l">
              <AuctionTimer
                :time="'Dec 16, 2021 11:07:00'"
                :show-auction.sync="showAuction"
              />
            </div>
          </div>
        </div>

        <div class="content block-margin">
          <div class="header-title">{{ $t("marketplace.story") }}</div>
          <p class="mtb text-m">
            It is the 29th-brightest star in the sky (the 4th-brightest in
            Orion) and is a blue supergiant. Together with Mintaka and Alnitak,
            the three stars make up Orion's belt, known by many names across
            many ancient cultures. Alnilam is the middle star. It is slightly
            variable, from magnitude 1.64 to 1.74. Since 1943, the spectrum of
            this star has served as one of the stable anchor points by which
            other stars are classified. It is also one of the 58 stars used in
            celestial navigation. It is at its highest point in the sky around
            midnight on December 15.
          </p>
          <ul class="tags">
            <li>
              <span class="tag text-s-bold">Luminosity (+3)</span>
            </li>
            <li>
              <span class="tag text-s-bold">Quality (+3)</span>
            </li>
            <li>
              <span class="tag text-s-bold">Colour (Colour)</span>
            </li>
          </ul>
        </div>

        <div class="history block-margin">
          <div class="left-side">
            <span class="display-f mr-8">
              <img src="~/assets/img/icons/clock-counter.svg" alt="counter" />
            </span>
            <span class="text-m-bold">Transactions history</span>
          </div>

          <div class="right-side">
            <nuxt-link to="/" class="no-color-dec-link text-m-bold show-history"
              >Show history</nuxt-link
            >
          </div>
        </div>

        <div class="auction satisfaction">
          <div class="left-side">
            <div class="img-block">
              <img src="~/assets/img/satisfaction.png" alt="satisfaction" />
            </div>
            <div class="info">
              <p class="mt-0 mb-4 header-title1">100% satisfaction!</p>
              <p class="mtb text-m-bold">
                Time to swap your Galaxy NFTs for hard assets? All our NFTs are
                backed up with real diamonds.
              </p>
            </div>
          </div>

          <div class="right-side">
            <Button
              class="second-btn"
              :label="$t('marketplace.exchangeToken')"
              :background="'grey'"
              :size="'medium'"
              :color="'c-grey'"
              @on-click="exchangeToken"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from "../../../components/header/Navigation";
import WebGl from "../../../components/marketplace/WebGl";
import Button from "../../../components/ui/Button";
import AuctionTimer from "../../../components/marketplace/AuctionTimer";

export default {
  name: "Index",
  components: {
    Navigation,
    WebGl,
    Button,
    AuctionTimer,
  },
  layout: "auth",
  middleware: "auth",
  async asyncData({ store, params }) {
    try {
      const nfts = await store.dispatch("nfts/getNftsById", { uid: params.id });
      return { nfts };
    } catch (e) {}
  },
  data() {
    return {
      showCard: false,
      showAuction: true,
    };
  },
  computed: {
    convertEthereum() {
      return (price) => {
        const defEthr = 0.00022;
        const usd = price / defEthr;
        return "est. $" + usd.toFixed(2) + "K";
      };
    },
  },
  methods: {
    payCard() {},

    buyNow() {},

    exchangeToken() {},
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/pages/marketplace-detail";
</style>
