import { defineStore } from 'pinia'

export const useMediaStore = defineStore('useMediaStore', {
  state: () => {
    return {
      src: "",
      ended: false,
      controls: true
    }
  },
  actions: {
    setSrc(payload) {
      this.src = payload
    },
    setEnded(payload) {
      this.ended = payload
    },
    setControls(payload) {
      this.controls = payload
    }
  }
})