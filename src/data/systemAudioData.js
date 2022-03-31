const fileName = [{
    name: "button",
    path: "./audio/system/",
    format: ".mp3",
  },
  {
    name: "correct",
    path: "./audio/system/",
    format: ".mp3",
  },
  {
    name: "menu",
    path: "./audio/system/",
    format: ".mp3",
  },
  {
    name: "uncorrect",
    path: "./audio/system/",
    format: ".mp3",
  },
]

export default fileName.reduce((obj, props) => {
  obj[props.name] = props.path + props.name + props.format
  return obj
}, {})