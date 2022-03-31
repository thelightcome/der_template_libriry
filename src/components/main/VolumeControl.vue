<template>
  <div class="volume">
    <button class="volume-btn" @click="volumeRange = !volumeRange">
      <svg
        width="2em"
        height="2em"
        viewBox="0 0 16 16"
        fill="white"
        xmlns="http://www.w3.org/2000/svg"
        class="bi bi-volume-up-fill"
      >
        <path
          d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"
        />
        <path
          d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"
        />
        <path
          d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707z"
        />
        <path
          fill-rule="evenodd"
          d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z"
        />
      </svg>
    </button>
    <div
      v-show="volumeRange"
      class="volume-range-wrap"
      @click="clickVolume"
      @mousedown="mousedownVolume"
    >
      <span class="volume-range" ref="volumeRange">
        <span class="volume-level" :style="getStyle"></span>
      </span>
    </div>
  </div>
</template>

<script>
import { useVolumeStore } from "../../store/useVolumeStore.js"

export default {
  data() {
    return {
      volumeRange: false,
    }
  },
  setup() {
    const volumeStore = useVolumeStore()

    return { volumeStore }
  },
  computed: {
    getStyle() {
      return {
        height: this.volumeStore.volume * 100 + '%'
      }
    }
  },
  methods: {
    clickVolume(e) {
      this.changeVolume(e.clientY)
    },
    mousedownVolume() {
      document.addEventListener("mousemove", this.clickVolume)
      document.addEventListener(
        "mouseup",
        () => {
          document.removeEventListener("mousemove", this.clickVolume)
        },
        { once: true }
      )
    },
    changeVolume(clickVal) {
      let volumeRangePos = this.$refs.volumeRange.getBoundingClientRect(),
        clickPos = volumeRangePos.height - (clickVal - volumeRangePos.top),
        volume = Math.round((clickPos / volumeRangePos.height) * 100) / 100

      if (volume >= 0 && volume <= 1) this.volumeStore.setVolume(volume)
    },
    mousewheelVolume(e) {
      if (this.volumeRange) {
        let val = this.volumeStore.volume - e.deltaY / 5000
        if (val > 0 && val < 1) this.volumeStore.setVolume(val)
      }
    },
    clickDocumentVolume(e) {
      if (!e.target.closest(".volume")) this.volumeRange = false
    },
  },
  mounted() {
    document.addEventListener("click", this.clickDocumentVolume)
    document.addEventListener("mousewheel", this.mousewheelVolume)
  },
  beforeUnmount() {
    document.removeEventListener("click", this.clickDocumentVolume)
    document.removeEventListener("mousewheel", this.mousewheelVolume)
  },
}

</script>

<style scoped>
.volume {
  position: relative;
  height: 100%;
  cursor: pointer;
}
.volume-btn {
  height: 100%;
  width: 6rem;
  background: transparent;
  border: none;
  outline: none;
}
.volume-range-wrap {
  position: absolute;
  left: 50%;
  bottom: 110%;
  transform: translateX(-50%);
  box-shadow: 0 0 3px 0 #000;
  background: #fff;
  border-radius: 11px;
  width: 32px;
  height: 202px;
  display: flex;
  align-items: center;
}
.volume-range {
  display: block;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 8px;
  background: lightgray;
  height: 176px;
  border-radius: 5px;
  cursor: pointer;
}
.volume-level {
  position: absolute;
  left: 0;
  bottom: 0;
  z-index: 15;
  background: #0075ff;
  width: 100%;
}
.volume-level:before {
  content: "";
  display: block;
  position: absolute;
  width: 15px;
  height: 15px;
  background: #0075ff;
  border-radius: 50%;
  left: 50%;
  top: 0;
  transform: translate(-50%, -50%);
}
</style>