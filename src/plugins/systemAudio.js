let playedList = {}

function audioPlay(name, path) {
  if (playedList[name]) return
  playedList[name] = true

  const audio = new Audio(path)

  audio.volume = localStorage.getItem("volume") || 0.5

  audio.addEventListener("canplay", () => {
    audio.play()
  })

  audio.addEventListener("ended", () => {
    playedList[name] = false
  })

  audio.addEventListener("error", () => {
    playedList[name] = false
  })
}

export default {
  install: (app, audioList) => {
    app.config.globalProperties.$systemAudio = (name) => {
      const path = audioList[name]

      if (path) audioPlay(name, path)
    }
  }
}