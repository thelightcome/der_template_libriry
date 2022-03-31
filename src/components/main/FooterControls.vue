<template>
  <div class="footer-controls">
    <div
      class="footer-controls-navigation footer-controls-prev"
      @click="prevSlide"
      v-html="$t('previous')"
    ></div>
    <div
      class="footer-controls-navigation footer-controls-next"
      @click="nextSlide"
      v-html="$t('next')"
    ></div>
  </div>
</template>

<script>
import { useSlidesStore } from "../../store/useSlidesStore.js"

export default {
  setup() {
    const slidesStore = useSlidesStore()

    return { slidesStore }
  },
  methods: {
    prevSlide() {
      this.$systemAudio("button")

      this.slidesStore.prevSlide()
    },
    nextSlide() {
      this.$systemAudio("button")

      this.slidesStore.nextSlide()
    },
  }
}

</script>

<style scoped>
.footer-controls {
  height: 100%;
  width: 21rem;
  margin-left: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.footer-controls-navigation {
  cursor: pointer;
  color: #fff;
  border: 1px solid #fff;
  width: 9.8rem;
  height: 3.2rem;
  background: #0066ba;
  box-sizing: border-box;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-style: normal;
  font-weight: normal;
  font-size: 2.1rem;
  line-height: 1.5;
  padding-bottom: 0.5rem;
  text-align: center;
}
.footer-controls-navigation:hover {
  color: #0066ba;
  background-color: white;
}
</style>