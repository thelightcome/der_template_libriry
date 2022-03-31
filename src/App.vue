<template>
  <RatioResize class="app-in" :width="1920" :height="1080" @resized="resized">
    <BaseHeader />
    <BaseMenu />
    <BaseMain />
    <BaseFooter />
  </RatioResize>
</template>

<script>
import { computed } from 'vue'

export default {
  data() {
    return {
      resizeObj: null,
    }
  },
  provide() {
    return {
      resizeObj: computed(() => this.resizeObj)
    }
  },
  methods: {
    resized(e) {
      this.resizeObj = e
    }
  },
  async mounted() {
    await this.$tincan.init(window.location.href)
  },
}

</script>

<style>
@import "../public/css/default.css";

.app-in {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  overflow: hidden;
}
</style>
