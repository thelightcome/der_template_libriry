<template>
  <div class="audio-wrapper" :class="{ active: mediaStore.controls && src }">
    <div class="audio-inner">
      <audio
        class="audio"
        ref="audio"
        :src="src"
        @playing="playing"
        @pause="pause"
        @error="error"
        @timeupdate="timeupdate"
        @ended="ended"
      ></audio>
      <button class="controls" @click.stop="changeState">
        <svg
          v-if="paused"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          width="50"
          height="50"
          viewBox="0 0 512 512"
        >
          <path d="M152.443 136.417l207.114 119.573-207.114 119.593z" fill="#0066ba" />
        </svg>
        <svg
          v-else
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          width="50"
          height="50"
          viewBox="0 0 512 512"
        >
          <path d="M162.642 148.337h56.034v215.317h-56.034v-215.316z" fill="#0066ba" />
          <path d="M293.356 148.337h56.002v215.317h-56.002v-215.316z" fill="#0066ba" />
        </svg>
      </button>
      <div
        class="progress-bar"
        ref="progress"
        @click.stop="changeProgress"
        @mousedown.stop="mousedownProgress"
      >
        <span :style="{ width: progress + '%' }"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { useVolumeStore } from "../../store/useVolumeStore.js"
import { useMediaStore } from "../../store/useMediaStore.js"

export default {
  data() {
    return {
      paused: true,
      progress: 0,
      duration: 0
    }
  },
  setup() {
    const volumeStore = useVolumeStore()

    const mediaStore = useMediaStore()

    return { volumeStore, mediaStore }
  },
  computed: {
    getVolume() {
      return this.volumeStore.volume
    },
    src() {
      return this.mediaStore.src
    }
  },
  watch: {
    getVolume(newVal) {
      if (this.$refs.audio) this.$refs.audio.volume = newVal
    },
    src(newVal) {
      if (newVal) {
        this.$refs.audio.load()
      } else if (!this.paused) {
        this.$refs.audio.pause()
      }
    },
  },
  methods: {
    playAudio() {
      this.mediaStore.setEnded(false)
      this.$refs.audio.volume = this.getVolume
      this.progress = 0
      this.duration = this.$refs.audio.duration
      this.$refs.audio.play()
    },
    playing() {
      this.paused = false
    },
    pause() {
      this.paused = true
    },
    error() {
      this.paused = true
    },
    timeupdate() {
      let audio = this.$refs.audio
      if (audio) this.progress = Math.round((audio.currentTime / audio.duration) * 100)
    },
    ended() {
      this.mediaStore.setEnded(true)
    },
    changeState() {
      if (this.$refs.audio.paused) this.$refs.audio.play()
      else this.$refs.audio.pause()
    },
    changeProgress(e) {
      let pos = this.$refs.progress.getBoundingClientRect(),
        clickPos = e.clientX - pos.left,
        progress = Math.round((clickPos / pos.width) * 100)

      this.$refs.audio.currentTime = (this.duration * progress) / 100
    },
    mousedownProgress() {
      document.addEventListener("mousemove", this.clickProgress)
      document.addEventListener(
        "mouseup",
        () => {
          document.removeEventListener("mousemove", this.clickProgress)
        },
        { once: true }
      )
    },
  },
  mounted() {
    this.$refs.audio.addEventListener("canplay", this.playAudio)
  }
}
</script>

<style scoped>
.audio-wrapper {
  position: relative;
  width: 100%;
  height: 0;
  overflow: hidden;
  transition: 0.3s linear;
}
.audio-wrapper.active {
  height: 4rem;
}
.audio-inner {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
}
.audio {
  position: absolute;
  pointer-events: none;
  opacity: 0;
  z-index: -10;
}
.controls {
  border: none;
  cursor: pointer;
  background: transparent;
  outline: none;
  padding: 0;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.progress-bar {
  flex-grow: 1;
  border: 1px solid #0066ba;
  height: 1.5rem;
  margin: 0 2rem 0rem 1rem;
  cursor: pointer;
}
.progress-bar span {
  display: block;
  height: 100%;
  background-color: #0066ba;
  width: 0%;
}
</style>