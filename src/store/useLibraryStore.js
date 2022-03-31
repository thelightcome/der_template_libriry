import libraryData from "../data/libraryData.js"

import { defineStore } from 'pinia'

export const useLibraryStore = defineStore('useLibraryStore', {
   state: () => {
      return {
         library: libraryData,
      }
   },
})