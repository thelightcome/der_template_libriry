import slideData from "../data/slideData.js"

import { defineStore } from 'pinia'

export const useSlidesStore = defineStore('useSlidesStore', {
  state: () => {
    return {
      instruction: "",
      currentBlockId: 0,
      currentSlideId: 1,
      blocks: slideData,
    }
  },
  getters: {
    getCurrentBlock(state) { return state.blocks[state.currentBlockId] },
    getCurrentSlide(state) { return this.getCurrentBlock.blockSlides?.[state.currentSlideId] },
    getBlocksLength(state) { return Object.keys(state.blocks).length },
    getBlockSlidesLength(state) { return (id) => Object.keys(state.blocks[id].blockSlides).length },
  },
  actions: {
    setInstruction(payload) {
      this.instruction = payload
    },
    setCurrentBlockId(payload) {
      this.currentBlockId = payload
    },
    setCurrentSlideId(payload) {
      this.currentSlideId = payload
    },
    prevSlide() {
      if (this.currentSlideId > 1) this.currentSlideId -= 1
      else if (this.currentBlockId > 1) {
        this.currentBlockId -= 1
        this.currentSlideId = this.getBlockSlidesLength(this.currentBlockId)
      } else {
        this.currentBlockId = 0
        this.currentSlideId = 1
      }
    },
    nextSlide() {
      if (this.currentSlideId < this.getBlockSlidesLength(this.currentBlockId)) this.currentSlideId += 1
      else if (this.currentBlockId < this.getBlocksLength - 1) {
        this.currentBlockId += 1
        this.currentSlideId = 1
      } else {
        this.currentBlockId = 0
        this.currentSlideId = 1
      }
    }
  }
})