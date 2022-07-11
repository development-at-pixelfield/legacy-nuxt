<template>
  <div>
    <div class="marketplace-detail">
      <div id="header-img" class="header">
        <div class="main-container header-nav">
          <Navigation
            :title="$t('marketplace.marketplace')"
            :custom-link="'/marketplace'"
            :with-query="true"
            class="nav"
            :trailing-action="true"
            :trailing-label="!canInteract ? 'Interact' : 'Stop'"
            @toggle="canInteract = !canInteract"
          />
        </div>
      </div>

      <WebGl :nft="nft" :can-interact="canInteract" />

      <div v-if="nft" class="main-container detail-info">
        <div class="detail">
          <div class="main-info block-margin">
            <div class="left-side">
              <h1 class="mb-8 mt-0 detail-title">{{ nft.name }}</h1>
              <span class="header-title1"
                >Current price: {{ currentPriceOrSoldPrice }}Ξ</span
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
                        nft.owner && nft.owner.avatar
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

              <div v-else-if="isTokenTransfer" class="sold-action">
                <div class="left-side-s">
                  <span class="img-block-s">
                    <img
                      :src="tokenTransferAvatar"
                      alt="auction"
                      class="img-s"
                    />
                  </span>

                  <div>
                    <p class="mtb text-m-bold">
                      {{ $t("marketplace.transferringToken") }}
                    </p>
                    <p class="mtb text-m-bold">
                      {{ tokenTransferInfo.username }}
                    </p>
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
                  :background="!buttonsActive ? 'grey' : 'ghost'"
                  :color="!buttonsActive ? 'c-grey' : 'c-white'"
                  :size="'medium'"
                  :tooltip="tooltipText"
                  :disabled="!buttonsActive"
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
                  :background="!buttonsActive ? 'grey' : 'primary'"
                  :size="'medium'"
                  :disabled="!buttonsActive"
                  :color="!buttonsActive ? 'c-grey' : 'c-white'"
                  @on-click="buyNow"
                >
                  <span slot="left-icon" class="mr-8 display-f">
                    <img
                      src="~/assets/img/icons/wallet.svg"
                      alt="credit-card"
                    />
                  </span>
                </Button>
              </div>
            </div>
          </div>

          <div v-if="nft.collection && nft.collection.category" class="traits">
            <div class="left-side">
              <div class="tile-wrapper">
                <div class="tile">
                  <img class="icon" :src="categoryIcon" alt="img" />
                  <h3>{{ nft.collection.category.name }}</h3>
                </div>
              </div>
            </div>
            <div class="right-side">
              <div
                v-for="(trait, index) in traits"
                :key="`trait_${index}`"
                class="tile-wrapper"
              >
                <div class="tile">
                  <h3 v-if="trait.collection">
                    {{ nft.collection[trait.key] }}
                  </h3>
                  <h3 v-else>{{ nft[trait.key] }}</h3>
                  <div class="tag">{{ trait.label }}</div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="nft.dutch_auction" class="auction block-margin">
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
                  :time="nft.dutch_auction.expiration"
                  :show-auction.sync="nft.dutch_auction"
                  @finished="timerFinished"
                />
              </div>
            </div>
          </div>

          <div class="content block-margin">
            <div class="header-title">{{ $t("marketplace.about") }}</div>
            <p class="mtb text-m mb-16">
              {{ nft.collection.about }}
            </p>
            <div class="tag-wrapper">
              <div v-if="nft.collection.nationality" class="nft-tag">
                {{ nft.collection.nationality }}
              </div>
              <div v-if="nft.collection.discipline" class="nft-tag">
                {{ nft.collection.discipline }}
              </div>
            </div>
          </div>

          <div
            v-if="nft.collection.achievements.length"
            class="content block-margin"
          >
            <div class="header-title">{{ $t("marketplace.achievements") }}</div>
            <div class="achievements-wrapper">
              <div
                v-for="(a, index) in nft.collection.achievements"
                :key="`a_${index}`"
                class="achievement"
              >
                <img
                  class="point"
                  src="~/assets/img/icons/achievement-point.svg"
                  alt=""
                />
                <div>
                  {{ a.achievement }}
                </div>
              </div>
            </div>
          </div>

          <div
            v-if="nft.collection.utilities.length"
            class="content block-margin"
          >
            <div class="header-title">{{ $t("marketplace.utilities") }}</div>
            <div class="utilities-wrapper">
              <div
                v-for="(u, index) in nft.collection.utilities"
                :key="`utility_${index}`"
                class="utility"
              >
                <div class="period">{{ u.amount }}x/{{ u.period }}</div>
                <img src="~/assets/img/icons/padlock-green.png" alt="icon" />
                <div class="title">
                  {{ u.utility }}
                </div>
              </div>
            </div>
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
              <span class="text-m-bold">Trading history</span>
            </div>

            <div class="right-side">
              <span class="no-color-dec-link text-m-bold show-history"
                >Show history</span
              >
            </div>
          </a>
        </div>
      </div>
      <Collection
        v-if="nft && nft.collection"
        :constellation-name="nft.collection.name"
        :related-nfts="nft.related"
        :eth-price="ethPrice"
        class="mt-40"
      />
    </div>
  </div>
</template>

<script>
import { EventType, OpenSeaSDK, Network } from "opensea-js";
import Navigation from "../../../components/header/Navigation";
import Button from "../../../components/ui/Button";
import AuctionTimer from "../../../components/marketplace/AuctionTimer";
import converter from "../../../mixins/converter";
import metamask from "../../../mixins/metamask";
import WebGl from "../../../components/marketplace/WebGl";
import Collection from "~/components/marketplace/Collection.vue";

export default {
  name: "Index",
  components: {
    Navigation,
    Button,
    AuctionTimer,
    Collection,
    WebGl,
  },
  mixins: [converter, metamask],
  layout(context) {
    if (context.$auth.$state.user) {
      return "auth";
    }
  },
  auth: false,
  middleware: "auth",
  async asyncData({ app, store, params, error }) {
    try {
      const nft = await store.dispatch("nfts/getNftsById", { uid: params.id });
      const ethPrice = (await store.dispatch("fetchEthPrice")).rate;

      return { nft, ethPrice };
    } catch (e) {
      console.log(e);
      console.log(e.response);
      // error({ statusCode: 404, message: "Page not found" });
    }
  },
  data() {
    return {
      traits: [
        {
          key: "career_level",
          label: "Career level",
          collection: true,
        },
        {
          key: "edition",
          label: "Edition",
        },
        {
          key: "collection_type",
          label: "Collection",
          collection: true,
        },
        {
          key: "issued_at",
          label: "Issued",
        },
      ],
      seaport: null,
      showCard: false,
      ethPrice: null,
      nft: null,
      canInteract: false,
    };
  },
  head: {
    script: [
      {
        src: "https://code.jquery.com/jquery-3.3.1.slim.min.js",
        integrity:
          "sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo",
        crossorigin: "anonymous",
      },
      {
        src: "https://verify.sendwyre.com/js/verify-module-init-beta.js",
      },
    ],
  },
  computed: {
    buttonsActive() {
      return this.nft.is_active;
    },
    categoryIcon() {
      const icon = this.nft.collection.category.icon;
      return icon || require("~/assets/img/icons/default-category-icon.svg");
    },
    isTokenTransfer() {
      if (!this.nft.last_offer) return false;
      return this.nft.last_offer.token_transfers_process.length;
    },
    tokenTransferInfo() {
      if (!this.nft.last_offer) return false;
      return this.nft.last_offer.token_transfers_process[0];
    },
    tokenTransferAvatar() {
      return this.tokenTransferInfo.avatar
        ? this.tokenTransferInfo.avatar
        : require("assets/img/default-transfer-avatar.png");
    },
    formatNftType() {
      return (type) => {
        return type.charAt(0).toUpperCase() + type.slice(1);
      };
    },
    convertEthereum() {
      return (price) => {
        return "est. $" + Number(this.ethPrice * price).toFixed(2);
      };
    },
    transactionsListLink() {
      const token = this.nft.nft_token;
      return token
        ? `${process.env.NETWORK_ETHERSCAN}token/${token.contract_address}?a=${token.token_id}`
        : null;
    },
    user() {
      return this.$auth.user;
    },
    isEmailVerified() {
      return this.user && this.user.is_email_verified;
    },
    isOwner() {
      return (
        this.user &&
        this.nft &&
        this.nft.owner &&
        this.nft.owner.username === this.user.username
      );
    },
    isUserVerified() {
      return this.user && this.user.is_verified;
    },
    currentPriceOrSoldPrice() {
      return this.nft.price_eth;
    },
  },
  async mounted() {
    this.$nuxt.$on("fetchNftData", async () => {
      this.nft = await this.$store.dispatch("nfts/getNftsById", {
        uid: this.$route.params.id,
      });
    });

    console.log(this.nft);

    if (
      Object.keys(this.$route.query).includes("wyre_success", "orderId") &&
      this.$auth.loggedIn
    ) {
      const success = this.$route.query.wyre_success;
      const orderId = this.$route.query.orderId;
      if (success === "true") {
        await this.$store.commit("setSnackbar", {
          show: true,
          message: this.$t("snackbar.wyre.success"),
          color: "success",
        });
        const evt = new EventSource(
          `${process.env.API_URL}wyre/order/status/?order_id=${orderId}`
        );
        evt.onmessage = (e) => {
          if (e.data === "COMPLETE") {
            this.$store.commit("setModal", {
              show: true,
              type: "checkout",
              data: this.nft,
              ethPrice: this.ethPrice,
              wyre: true,
            });
            evt.close();
          } else {
            this.$store.commit("setModal", {
              show: true,
              type: "wyre-processing",
              data: this.nft,
            });
          }
        };
      } else {
        await this.$store.commit("setSnackbar", {
          show: true,
          message: this.$t("snackbar.wyre.error.unknown"),
          color: "error",
        });
      }
    }
  },
  beforeDestroy() {
    this.$nuxt.$off("fetchNftData");
  },
  methods: {
    initSeaport() {
      const networkName = process.env.OPENSEA_NETWORK;
      const API_KEY = process.env.OPENSEA_API_KEY;

      this.seaport = new OpenSeaSDK(
        // Use metamask as the provider to sign transactions from currently attached wallet
        window.web3.currentProvider,
        {
          networkName: Network[networkName],
          apiKey: API_KEY,
        },
        (arg) => console.log("arg", arg)
      );
      this.$store.commit("seaport", this.seaport);
      this.initSeaportListeners();
    },
    initSeaportListeners() {
      this.seaport.addListener(
        EventType.TransactionCreated,
        ({ transactionHash, event }) => {
          this.$store.commit("setModal", {
            show: true,
            type: "purchase",
            data: {
              nft: this.nft,
              status: "processing",
            },
          });
          console.log(
            "Transaction Created Listener, details - hash, event:",
            transactionHash,
            event
          );
        }
      );
      this.seaport.addListener(
        EventType.TransactionConfirmed,
        async ({ transactionHash, event }) => {
          await this.$store.commit("setModal", {
            show: false,
            type: null,
          });
          const result = {
            transactionHash,
          };
          await this.$store.dispatch("nfts/openseaTokenTransfer", {
            offer_uid: this.nft.transfer_token_uid.replaceAll("-", ""),
          });
          await this.$auth.fetchUser();
          await this.$store.commit("setModal", {
            show: true,
            type: "purchase",
            data: {
              nft: this.nft,
              resultPayment: result,
              status: "finished",
            },
          });
          console.log(transactionHash, event);
          console.log(
            "Transaction Confirmed Listener, details - hash, event:",
            transactionHash,
            event
          );
        }
      );
      this.seaport.addListener(
        EventType.TransactionDenied,
        ({ transactionHash, event }) => {
          this.$store.commit("setSnackbar", {
            show: true,
            message:
              "An error occurred while making the transaction, make sure you have enough funds",
            color: "error",
          });
        }
      );
      this.seaport.addListener(
        EventType.TransactionFailed,
        ({ transactionHash, event }) => {
          console.log(transactionHash, event);
          console.log(
            "Transaction Failed Listener, details - hash, event:",
            transactionHash,
            event
          );
        }
      );
    },
    toDetail(item) {
      this.$store.commit("setQuery", this.$route.query);
      this.$router.push(`/marketplace/${item.uid}`);
    },
    async payCard() {
      if (!this.$auth.loggedIn) {
        const back = `/marketplace/${this.$route.params.id}/`;
        return await this.$router.push(`/login?back=${back}`);
      }

      const availToPayOrState = this.availToPay();
      if (availToPayOrState !== true) {
        return await this[availToPayOrState.action]();
      }

      const accounts = await this.metamask.getAccounts();
      const isConnected = this.$auth.user.wallet_address;

      if (!accounts.length || !isConnected) {
        try {
          await this.connectMetamask();
          await this.getBalance();
        } catch (e) {
          console.log("err", e);
          if (e.code === -32002) {
            await this.$store.commit("setSnackbar", {
              show: true,
              message: this.$t("snackbar.metamask.loading"),
              color: "error",
              timeout: 10000,
            });
          }
        }
        return;
      }

      // eslint-disable-next-line no-unreachable
      try {
        const data = await this.$store.dispatch("wyre/reserve", {
          uid: this.$route.params.id,
          addressTo: this.$auth.user.wallet_address,
        });

        // eslint-disable-next-line no-undef
        const widget = new Wyre({
          env: "test",
          reservation: data.reservation,
          auth: {
            type: "metamask",
          },
          operation: {
            destCurrency: "ETH",
            type: "debitcard-hosted-dialog",
          },
          web3PresentInParentButNotChild: false,
        });

        console.log("data here", data);
        console.log("widget here", widget);

        window.open(data.url);

        // widget.open();
      } catch (e) {
        console.log(e);
      }
    },
    async buyNow() {
      this.initSeaport();
      const availToPayOrState = this.availToPay();
      if (availToPayOrState !== true) {
        return await this[availToPayOrState.action]();
      }
      return await this.checkout();
    },

    availToPay() {
      const states = {
        not_auth: !!this.user,
        metamask_not_installed: this.metamask.isEnabled,
        email_not_verified: this.isEmailVerified,
        user_not_verified: this.isUserVerified,
        wallet_is_not_connected: this.user && !!this.user.wallet_address,
      };
      if (Object.values(states).every((item) => item === true)) {
        return true;
      }
      const state = Object.keys(states)
        .filter((item) => states[item] === false)
        .shift();
      const actions = {
        not_auth: "guestTryToPay",
        metamask_not_installed: "metamaskNotInstalled",
        email_not_verified: "emailNotVerifiedTryToPay",
        user_not_verified: "userNotVerifiedTryToPay",
        wallet_is_not_connected: "walletNotConnected",
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
      const query = {
        nft: this.nft.uid,
      };

      await this.$router.push({ path: "/exchange", query });
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
    async walletNotConnected() {
      await this.$store.commit("setModal", {
        show: true,
        type: "checkout-wallet",
        data: this.nft,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "assets/scss/pages/marketplace-detail";
</style>
