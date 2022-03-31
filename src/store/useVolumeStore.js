import { defineStore } from 'pinia'

export const useVolumeStore = defineStore('useVolumeStore', {
  state: () => {
    return {
      volume: 0.5,
    }
  },
  actions: {
    setVolume(payload) {
      localStorage.setItem("volume", payload)
      this.volume = payload
    }
  }
})