<template>
  <div class="main-container">
    <main>
      <h2>
        <nuxt-link to="/help" class="flex">
          <img src="~/assets/img/icons/arrow-left.svg" alt="<-" />
          <span>Help</span>
        </nuxt-link>
      </h2>
      <h1></h1>
      <p>Lorem, ipsum dolor.</p>
      <SimpleDropdown>
        <template slot="title">
          <div>Title</div>
        </template>
        <div>
          <div>Lorem, ipsum.</div>
          <GuideLineElement number="1">
            <template slot="title">
              <div>Title</div>
            </template>
            <div>Lorem, ipsum dolor.</div>
          </GuideLineElement>
          <GuideLineElement number="2">
            <template slot="title">
              <div>Title</div>
            </template>
            <div>Lorem, ipsum dolor.</div>
          </GuideLineElement>
        </div>
      </SimpleDropdown>
    </main>
  </div>
</template>

<script>
import SimpleDropdown from "../../../components/ui/SimpleDropdown.vue";
import GuideLineElement from "../../../components/help/GuideLineElement.vue";
export default {
  name: "BuyETH",
  layout: "default",
  components: { SimpleDropdown, GuideLineElement },
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/pages/help";
div {
  display: block;
}
* {
  color: white;
}
</style>
