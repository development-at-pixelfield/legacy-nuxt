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
            <span class="header-title1"
              >Current price:
              {{ (+nfts.last_offer.eth_current_price).toFixed(2) }}Ξ</span
            >
            <span class="header-title1 ml-16">{{
              convertEthereum(nfts.last_offer.eth_current_price)
            }}</span>
          </div>

          <div class="right-side">
            <div v-if="nfts.is_sold" class="sold-action">
              <div class="left-side-s">
                <span class="img-block-s">
                  <img
                    :src="
                      nfts.owner.avatar
                        ? nfts.owner
                        : require('assets/img/auction.png')
                    "
                    alt="auction"
                    class="img-s"
                  />
                </span>

                <div>
                  <p class="mtb text-m-bold">Current owner</p>
                  <p class="mtb text-m-bold">{{ nfts.owner.display_name }}</p>
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
                :time="nfts.last_offer.price_changes_at"
                :show-auction.sync="showAuction"
              />
            </div>
          </div>
        </div>

        <div class="content block-margin">
          <div class="header-title">{{ $t("marketplace.story") }}</div>
          <p class="mtb text-m">
            {{ nfts.description }}
          </p>
          <ul class="tags">
            <li v-if="nfts.luminosity">
              <span class="tag text-s-bold"
                >Luminosity (+{{ nfts.luminosity }})</span
              >
            </li>
            <li v-if="nfts.quality_level">
              <span class="tag text-s-bold"
                >Quality ({{ nfts.quality_level }})</span
              >
            </li>
            <li v-if="nfts.age">
              <span class="tag text-s-bold">Age ({{ nfts.age }})</span>
            </li>
            <li v-if="nfts.nft_type">
              <span class="tag text-s-bold">Type ({{ nfts.nft_type }})</span>
            </li>
            <li v-if="nfts.is_constellation">
              <span class="tag text-s-bold">Path of constellation (Yes)</span>
            </li>
            <li v-if="nfts.constellation">
              <span class="tag text-s-bold"
                >Constellation ({{ nfts.constellation.name }})</span
              >
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
import converter from "../../../mixins/converter";

export default {
  name: "Index",
  components: {
    Navigation,
    WebGl,
    Button,
    AuctionTimer,
  },
  mixins: [converter],
  layout(context) {
    if (context.$auth.$state.user) {
      return "auth";
    }
  },
  auth: false,
  middleware: "auth",
  async asyncData({ app, store, params }) {
    try {
      const nfts = await store.dispatch("nfts/getNftsById", { uid: params.id });
      const ethPrice = (await store.dispatch("fetchEthPrice")).rate;

      let showAuction = false;
      if (nfts.last_offer.category === "timed") showAuction = true;

      console.log(nfts, "nfts");
      return { nfts, ethPrice, showAuction };
    } catch (e) {}
  },
  data() {
    return {
      showCard: false,
      showAuction: false,
    };
  },
  computed: {
    convertEthereum() {
      return (price) => {
        return "est. $" + Number(this.ethPrice * price).toFixed(3) + "K";
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
