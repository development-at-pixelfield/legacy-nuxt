<template>
  <ScaffoldModal :heading="$t('nft_modal.checkout')" @close="close">
    <div class="buying-header text-m">
      {{ $t("nft_modal.you_are_buying") }} <strong>{{ nft.name }}</strong>
    </div>
    <div class="divider" />
    <div v-if="wyre" class="summary mb-16">
      <div>{{ $t("nft_modal.currentPrice") }}</div>
      <div>
        <div class="summary_heading">{{ nft.price_eth }}Ξ</div>
        <div class="summary_sub-heading">(${{ nft.price_usd }})</div>
      </div>
    </div>
    <div v-if="wyre" class="summary mb-16">
      <div>{{ $t("nft_modal.wyreFee") }}</div>
      <div>
        <div class="summary_sub-heading">${{ wyreFee(false) }}</div>
      </div>
    </div>
    <div class="summary">
      <div>{{ $t("nft_modal.total") }}</div>
      <div>
        <div class="summary_heading">{{ totalEth }}Ξ</div>
        <div class="summary_sub-heading">(${{ totalUsd }})</div>
      </div>
    </div>
    <div class="divider" />
    <template v-if="loading">
      <div class="loading-container">
        <Spinner></Spinner>
      </div>
    </template>
    <template v-if="!loading">
      <Checkbox :name.sync="agree" class="mb-32 terms" :error="checkError">
        <label slot="label" class="text-m">
          {{ $t("auth.agreeWith") }} &nbsp;
          <a
            target="_blank"
            href="https://storage.googleapis.com/pfld-outdoor-production-documents-bucket/ISIAjobs_Terms_and_Conditions_2021_10_05_revMP_fin%20(1).pdf"
            class="no-color-dec-link text-btn"
            >{{ $t("auth.termCond") }}</a
          >
        </label>
      </Checkbox>
      <div class="button-wrap">
        <Button
          class="first-btn"
          :background="'ghost'"
          :size="'medium'"
          :color="'c-white'"
          :label="$t('nft_modal.addFunds')"
          @on-click="addFunds"
          ><span slot="left_icon" class="icon-button"
            ><img src="~/assets/img/icons/credit-card.svg" /></span
        ></Button>
        <Button
          :background="userHasEnoughFunds ? 'primary' : 'default'"
          :size="'medium'"
          :color="'c-white'"
          :disabled="!userHasEnoughFunds"
          :label="canPurchaseText"
          @on-click="purchaseNft"
          ><span v-if="userHasEnoughFunds" slot="left_icon" class="icon-button"
            ><img src="~/assets/img/icons/wallet.svg" /></span
        ></Button>
      </div>
      <div
        v-if="balance !== false"
        class="current-balance"
        :class="
          userHasEnoughFunds
            ? 'current-balance_positive'
            : 'current-balance_negative'
        "
      >
        {{ $t("nft_modal.availableBalance") }} {{ displayBalance }}Ξ (${{
          balanceDollars
        }})
      </div>
    </template>
  </ScaffoldModal>
</template>

<script>
import { OrderSide } from "opensea-js/lib/types";
import Checkbox from "../../../components/ui/Checkbox";
import Button from "../../ui/Button";
import converter from "../../../mixins/converter";
import metamask from "../../../mixins/metamask";
import ScaffoldModal from "~/components/modals/nft/ScaffoldModal.vue";
import Spinner from "~/components/ui/Spinner.vue";

export default {
  name: "NftCheckoutModal",
  components: {
    ScaffoldModal,
    Checkbox,
    Button,
    Spinner,
  },
  mixins: [converter, metamask],
  props: {
    wyre: {
      type: Boolean,
      default: false,
    },
    ethPrice: {
      type: [Number, String],
      default: 0,
    },
  },
  data() {
    return {
      agree: false,
      checkError: "",
      nftData: this.$store.getters.modal.data,
      seaport: this.$store.getters.seaport,
      loading: true,
    };
  },
  computed: {
    wyreFee() {
      return (isEth = false) => {
        const currency = isEth ? this.nft.price_eth : this.nft.price_usd;
        const fees = 0.029 + 0.3;
        const price = Number(currency * fees).toFixed(2);
        const total = price <= 5 ? 5 : +price;
        if (!isEth) return total.toFixed(2);
        return (total / this.ethPrice).toFixed(4);
      };
    },
    wyreTotal() {
      const fee = this.wyreFee;
      const nftCost = Number(this.ethPrice * this.nft.price_eth).toFixed(2);
      return +fee + +nftCost;
    },
    totalEth() {
      if (!this.wyre) return this.nft.price_eth;
      return +this.nft.price_eth + +this.wyreFee(true);
    },
    totalUsd() {
      if (!this.wyre) return this.nft.price_usd;
      return (+this.nft.price_usd + +this.wyreFee()).toFixed(2);
    },
    nft() {
      const data = this.nftData;
      const priceEth = data.price_eth;
      const priceUsd = +this.ethToUsd(priceEth);
      return {
        wyre: data.wyre,
        name: data.name,
        price_eth: priceEth.toFixed(4),
        price_usd: priceUsd.toFixed(4),
      };
    },
    canPurchaseText() {
      return this.userHasEnoughFunds
        ? `${this.$t("nft_modal.pay")} ${this.nft.price_eth}`
        : this.$t("nft_modal.noFunds");
    },
    userHasEnoughFunds() {
      return this.balance >= +this.nft.price_eth;
    },
    balanceDollars() {
      const balance = +this.ethToUsd(this.balance);
      return balance.toFixed(4);
    },
  },
  watch: {
    agree(val) {
      if (val) this.checkError = "";
    },
  },
  async mounted() {
    this.$nuxt.$on("metamask:disconnected", () => {
      this.$emit("close");
    });
    await this.connectMetamask();
    await this.getBalance();
    this.loading = false;
  },
  methods: {
    async addFunds() {
      this.$emit("close");
      await this.$store.commit("setModal", {
        show: true,
        type: "pay-card",
        data: this.nftData,
      });
    },
    async purchaseNft() {
      if (!this.agree) {
        this.checkError = this.$t("validations.termAgree");
        return false;
      }
      const contractAddress = this.nftData.nft_token.contract_address;
      const tokenId = this.nftData.nft_token.token_id;
      const network = this.nftData.nft_token.network_name;
      if (!network.toLowerCase().includes("rinkeby")) {
        return await this.$store.commit("setSnackbar", {
          show: true,
          message: this.$t("snackbar.payments.unsupportedNetwork"),
          color: "error",
        });
      }
      const devAccount = process.env.DEVELOPER_ACCOUNT_OWNER_NFT;
      if (this.metamaskAccount === devAccount) {
        return await this.$store.commit("setSnackbar", {
          show: true,
          message: this.$t("snackbar.payments.accountIsDev"),
          color: "error",
        });
      }
      console.log(tokenId, contractAddress);
      if (!tokenId || !contractAddress) {
        return await this.$store.commit("setSnackbar", {
          show: true,
          message: this.$t("snackbar.payments.noContractOrTokenId"),
          color: "error",
        });
      }
      try {
        const payload = {
          assetContractAddress: contractAddress,
          tokenIds: [tokenId],
          side: "ask",
          protocol: "seaport",
        };
        const order = await this.seaport.api.getOrder(payload);
        if (!order) {
          return await this.$store.commit("setSnackbar", {
            show: true,
            message:
              "No sell offer found for this listing! Please try again later",
            color: "error",
          });
        }
        console.log(order);
        await this.seaport.fulfillOrder({
          order,
          accountAddress: this.metamaskAccount,
        });
        // console.log("info");
        // console.log("hash", transactionHash);
      } catch (e) {
        console.log("err", e);
        await this.$store.commit("setSnackbar", {
          show: true,
          message: e.message,
          color: "error",
        });
      }
    },
    close() {
      this.$emit("close");
    },
    async prePayment() {
      this.nftData = await this.$store.dispatch("nfts/getNftsById", {
        uid: this.nftData.uid,
      });
      const payload = {
        offer_uid: this.nftData.last_offer.uid,
        account_address: this.metamaskAccount,
      };
      return await this.$store.dispatch("nfts/initPayment", payload);
    },
    async processPayment() {
      let paymentsInit = {};
      try {
        paymentsInit = await this.prePayment();
      } catch (e) {
        await this.$store.commit("setSnackbar", {
          show: true,
          message: this.$t("snackbar.payments.notAbleToInitPayment"),
          color: "error",
        });
        this.$emit("close");
        return false;
      }
      console.log(paymentsInit);
      const lastOfferPrice = this.nftData.last_offer.eth_current_price;
      const method = this.nftData.last_offer.category;
      const tokenContract = this.nftData.nft_token.contract_address;
      const tokenId = this.nftData.nft_token.token_id;
      try {
        await this.$store.commit("setModal", {
          show: true,
          type: "purchase",
          data: {
            nft: this.nftData,
            status: "processing",
          },
        });
        const result = await this.metamask.payNFT(
          tokenContract,
          tokenId,
          method,
          lastOfferPrice
        );
        if (result != null && result.transactionHash != null) {
          this.$store.commit("setModal", {
            show: false,
            type: null,
          });
          setTimeout(async () => {
            const offerUid = this.nftData.last_offer.uid.replaceAll("-", "");
            await this.$store.dispatch("nfts/addTransferToken", {
              offer_uid: offerUid,
            });
            await this.$auth.fetchUser();
            await this.$store.commit("setModal", {
              show: true,
              type: "purchase",
              data: {
                nft: this.nftData,
                resultPayment: result,
                status: "finished",
              },
            });
          }, 100);
        } else {
          await this.$store.commit("setSnackbar", {
            show: true,
            message: this.$t("snackbar.payments.basicError"),
            color: "error",
          });
        }
      } catch (error) {
        await this.$store.commit("setSnackbar", {
          show: true,
          message:
            error.code === 4001
              ? this.$t("snackbar.payments.cancelledByUser")
              : error.code === -1
              ? this.$t("snackbar.payments.unsuportedNetwork")
              : this.$t("snackbar.payments.basicError"),
          color: "error",
        });
        this.$store.commit("setModal", {
          show: false,
          type: null,
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "~assets/scss/modals/nft/checkout";
</style>
