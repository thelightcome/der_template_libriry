import glossaryData from "../data/glossaryData.js"

import { defineStore } from 'pinia'

export const useGlossaryStore = defineStore('useGlossaryStore', {
  state: () => {
    return {
      chars: ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ы', 'Э', 'Ю', 'Я', '='],
      glossary: glossaryData,
    }
  },
  getters: {
    getGlossaryText(state) {
      return (char) => {
        return state.glossary.filter(obj => {
          return obj.char.toLocaleLowerCase() === char.toLocaleLowerCase()
        }).sort((a, b) => a.char > b.char)
      }
    }
  }
})
