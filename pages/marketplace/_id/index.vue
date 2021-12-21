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
          <WebGl v-if="nft.model_file" :src="nft.model_file" />
        </div>
      </div>
    </div>

    <div class="main-container">
      <div class="detail">
        <div class="main-info block-margin">
          <div class="left-side">
            <h1 class="mb-8 mt-0 detail-title">{{ nft.name }}</h1>
            <span class="header-title1"
              >Current price: {{ (+currentPriceOrSoldPrice).toFixed(3) }}Ξ</span
            >
            <span class="header-title1 ml-16">{{
              convertEthereum(currentPriceOrSoldPrice)
            }}</span>
          </div>

          <div class="right-side">
            <div v-if="nft.is_sold" class="sold-action">
              <div class="left-side-s">
                <span class="img-block-s">
                  <img
                    :src="
                      nft.owner
                        ? nft.owner.avatar
                        : require('assets/img/auction.png')
                    "
                    alt="auction"
                    class="img-s"
                  />
                </span>

                <div>
                  <p class="mtb text-m-bold">Current owner</p>
                  <p class="mtb text-m-bold">{{ nft.owner.username }}</p>
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
                :time="nft.last_offer.price_changes_at"
                :show-auction.sync="showAuction"
                @finished="timerFinished"
              />
            </div>
          </div>
        </div>

        <div class="content block-margin">
          <div class="header-title">{{ $t("marketplace.story") }}</div>
          <p class="mtb text-m">
            {{ nft.description }}
          </p>
          <ul class="tags">
            <li v-if="nft.luminosity">
              <span class="tag text-s-bold"
                >Luminosity (+{{ nft.luminosity }})</span
              >
            </li>
            <li v-if="nft.quality_level">
              <span class="tag text-s-bold"
                >Quality ({{ nft.quality_level }})</span
              >
            </li>
            <li v-if="nft.age">
              <span class="tag text-s-bold">Age ({{ nft.age }})</span>
            </li>
            <li v-if="nft.nft_type">
              <span class="tag text-s-bold">Type ({{ nft.nft_type }})</span>
            </li>
            <li v-if="nft.is_constellation">
              <span class="tag text-s-bold">Path of constellation (Yes)</span>
            </li>
            <li v-if="nft.constellation">
              <span class="tag text-s-bold"
                >Constellation ({{ nft.constellation.name }})</span
              >
            </li>
          </ul>
        </div>

        <a
          :href="transactionsListLink"
          target="_blank"
          class="history block-margin"
        >
          <div class="left-side">
            <span class="display-f mr-8">
              <img src="~/assets/img/icons/clock-counter.svg" alt="counter" />
            </span>
            <span class="text-m-bold">Transactions history</span>
          </div>

          <div class="right-side">
            <span class="no-color-dec-link text-m-bold show-history"
              >Show history</span
            >
          </div>
        </a>

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
              :background="isOwner ? 'primary' : 'c-grey'"
              :size="'medium'"
              :color="isOwner ? 'c-white' : 'c-grey'"
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
import metamask from "../../../mixins/metamask";

export default {
  name: "Index",
  components: {
    Navigation,
    WebGl,
    Button,
    AuctionTimer,
  },
  mixins: [converter, metamask],
  layout(context) {
    if (context.$auth.$state.user) {
      return "auth";
    }
  },
  auth: false,
  middleware: "auth",
  async asyncData({ app, store, params }) {
    try {
      const nft = await store.dispatch("nfts/getNftsById", { uid: params.id });
      // console.log(nft);
      const ethPrice = (await store.dispatch("fetchEthPrice")).rate;

      let showAuction = false;
      if (nft.last_offer && nft.last_offer.category === "timed") {
        showAuction = true;
      }

      return { nft, ethPrice, showAuction };
    } catch (e) {
      console.log(e);
    }
  },
  data() {
    return {
      showCard: false,
      showAuction: false,
      ethPrice: null,
      nft: {},
    };
  },
  computed: {
    convertEthereum() {
      return (price) => {
        return "est. $" + Number(this.ethPrice * price).toFixed(3) + "K";
      };
    },
    transactionsListLink() {
      const token = this.nft.nft_token;
      return `${process.env.NETWORK_ETHERSCAN}token/${token.contract_address}?a=${token.token_id}`;
    },
    user() {
      return this.$auth.user;
    },
    isEmailVerified() {
      return this.user && this.user.is_email_verified;
    },
    isOwner() {
      console.log(this.nft.owner.username);
      console.log(this.user.username);
      return this.nft.owner && this.nft.owner.username === this.user.username;
    },
    isUserVerified() {
      return this.user && this.user.is_verified;
    },
    currentPriceOrSoldPrice() {
      const lastOffer = this.nft.last_offer;
      return this.nft.is_sold
        ? +this.nft.eth_sold_for
        : lastOffer
        ? lastOffer.eth_current_price
        : 0;
    },
  },
  methods: {
    payCard() {},

    async buyNow() {
      const availToPayOrState = this.availToPay();
      if (availToPayOrState !== true) {
        return await this[availToPayOrState.action]();
      }
      return await this.checkout();
    },

    availToPay() {
      const states = {
        metamask_not_installed: this.metamask.isEnabled,
        not_auth: !!this.user,
        email_not_verified: this.isEmailVerified,
        user_not_verified: this.isUserVerified,
      };
      if (Object.values(states).every((item) => item === true)) {
        return true;
      }
      const state = Object.keys(states)
        .filter((item) => states[item] === false)
        .shift();
      const actions = {
        metamask_not_installed: "metamaskNotInstalled",
        not_auth: "guestTryToPay",
        email_not_verified: "emailNotVerifiedTryToPay",
        user_not_verified: "userNotVerifiedTryToPay",
      };
      return {
        state,
        action: actions[state],
      };
    },
    async guestTryToPay() {
      await this.$store.commit("setSnackbar", {
        show: true,
        message: this.$t("snackbar.payments.loginRequired"),
        color: "error",
      });
      const link = `/login?back=${this.$route.path}`;
      await this.$router.push(link);
    },
    async emailNotVerifiedTryToPay() {
      await this.$store.commit("setModal", {
        show: true,
        type: "verification-required",
        data: {
          title: this.$t("nft_modal.emailVerificationTitle"),
          description: this.$t("nft_modal.emailVerificationDescription"),
        },
      });
    },
    async userNotVerifiedTryToPay() {
      await this.$store.commit("setModal", {
        show: true,
        type: "verification-required",
      });
    },
    async metamaskNotInstalled() {
      await this.$store.commit("setModal", {
        show: true,
        type: "checkout-metamask",
      });
    },
    async exchangeToken() {
      await this.$router.push("/exchange");
    },

    timerFinished() {
      this.$router.app.refresh();
    },
    async checkout() {
      await this.$store.commit("setModal", {
        show: true,
        type: "checkout",
        data: this.nft,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/pages/marketplace-detail";
</style>
