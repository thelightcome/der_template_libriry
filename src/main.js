import {
  createApp
} from 'vue'
import {
  createPinia
} from 'pinia'

import dictionaryData from "./data/dictionaryData.js"
import translater from "./plugins/translater.js"

import systemAudioData from "./data/systemAudioData.js"
import systemAudio from "./plugins/systemAudio.js"

import tinCanHelper from "./plugins/tinCanHelper.js"

import fSize from "./directives/f-size.js"

import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
app.use(translater, dictionaryData)
app.use(systemAudio, systemAudioData)
app.use(tinCanHelper)

app.directive('f-size', fSize)

const components = [
  import.meta.globEager('./components/*.vue'),
  import.meta.globEager('./components/helper/*.vue'),
  import.meta.globEager('./components/main/*.vue'),
  import.meta.globEager('./components/layout/*.vue'),
  import.meta.globEager('./components/slide/*.vue'),
  import.meta.globEager('./components/test/*.vue'),
  import.meta.globEager('./components/ui/*.vue')
]
components.forEach(obj => {
  Object.entries(obj).forEach(([path, definition]) => {
    const componentName = path.split('/').pop().replace(/\.\w+$/, '')
    app.component(componentName, definition.default)
  })
})

app.mount('#app')