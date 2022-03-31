<template>
  <div class="ratio-resize" ref="ratioResize" :style="{ ...getSizeStyle, ...getResizeStyle }">
    <slot></slot>
  </div>
</template>

<script>

export default {
  props: {
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    },
  },
  emits: ["resized"],
  data() {
    return {
      ratio: 1,
    }
  },
  computed: {
    getSizeStyle() {
      return {
        width: `${this.width}px`,
        height: `${this.height}px`,
      }
    },
    getResizeStyle() {
      return {
        transform: `scale(${this.ratio}) translate(-50%, -50%)`,
      }
    }
  },
  methods: {
    resize() {
      this.setRatio()
      this.setScaleOpt()
    },
    setRatio() {
      const WH = window.innerHeight, WW = window.innerWidth
      if (WW / WH < this.width / this.height) this.ratio = WW / this.width
      else this.ratio = WH / this.height
    },
    setScaleOpt() {
      this.$nextTick(() => {
        let style = this.$refs.ratioResize.getBoundingClientRect()
        this.$emit("resized", {
          offsetX: style.left,
          offsetY: style.top,
          ratio: this.ratio,
        })
      })
    },
  },
  mounted() {
    this.resize()
  },
  beforeMount() {
    window.addEventListener("resize", this.resize)
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.resize)
  }
}
</script>

<style scoped>
.ratio-resize {
  position: absolute !important;
  top: 50% !important;
  left: 50% !important;
  transform-origin: 0 0 !important;
}
</style>