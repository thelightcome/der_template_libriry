const defaults = {
  actor: {
    name: "a",
    mbox: "a@mail.kz",
  },
  endpoint: "http://lrs-xapi.sapasoft.kz/data/xAPI/",
  auth: "Basic YTExNDc0NGFiNDQxNWExZGVmNDZhY2RjYmQ3ZDY2YjEyNWJkMTlkODpiOTNiYmIxN2Q2Y2YxMWM4N2MyYWQ0NjU0NmVlZWE4N2IzZGZhNDc2",
  activitiesURI: "http://adlnet.gov/expapi/activities/",
  verbsURI: "http://adlnet.gov/expapi/verbs/",
}

const ConfigTC = {
  online: true,
  send: true,
  language: "ru-RU",
  uri: "http://lrs-xapi.sapasoft.kz/activity",
  allowFail: false,
}

const categoryObj = {
  id: 'course',
  name: 'Логистика',
  description: 'Логистика',
}

class TinCanHelper {
  constructor() {
    this.lrs = null

    this.actor = null

    this.derObj = null

    this.loaded = false

    this.initCallback = null
    this.endCallback = null
  }

  async init(url, xmlName = "tincan.xml") {
    const urlObj = parseURL(url)

    if (!urlObj.auth || !urlObj.endpoint) return

    this.lrs = initLRS(urlObj.auth || defaults.auth, urlObj.endpoint || defaults.endpoint)

    this.actor = urlObj.actor || defaults.actor

    const xmlData = await getInfoFromXML(xmlName)

    if (!xmlData) return

    this.loaded = true

    this.derObj = {
      id: xmlData.id,
      type: 'course',
      name: xmlData.name,
      description: xmlData.description,
      startTimeStamp: new Date(),
    }

    this.createStatement({
      "verbType": "attempted",
      "activityObj": this.derObj,
      "resultObj": {
        "duration": "PT0S"
      }
    }, this.initCallback)
  }

  end(rawScore = 55, maxScore = 99) {
    if (!this.loaded) return

    const derDuration = TinCan.Utils.convertMillisecondsToISO8601Duration(Math.abs((new Date()) - this.derObj.startTimeStamp))
    const scaled = rawScore / maxScore

    let resObj = {
      score: {
        raw: rawScore,
        max: maxScore,
        min: 0,
        scaled: scaled,
      },
      success: scaled >= 0.5,
      completion: true,
      duration: (derDuration !== "PTNaNS") ? derDuration : "PT0S",
    }

    this.createStatement({
      "verbType": "completed",
      "activityObj": this.derObj,
      "resultObj": resObj,
    }, this.endCallback)
  }

  createStatement(info, cb = null) {
    if (this.actor.name === defaults.actor.name || !this.lrs) return

    const activityDefinition = {
      type: defaults.activitiesURI + info.activityObj.type,
      name: {
        [ConfigTC.language]: info.activityObj.name
      },
      description: {}
    }

    if (info.activityObj.type == "cmi.interaction") {
      activityDefinition.interactionType = info.activityObj.itype
      activityDefinition.correctResponsesPattern = info.activityObj.correctResponsesPattern
      if (info.activityObj.itype == "choice" || info.activityObj.itype == "sequencing") {
        activityDefinition.choices = info.activityObj.choices
      } else if (info.activityObj.itype == "matching") {
        activityDefinition.source = info.activityObj.source
        activityDefinition.target = info.activityObj.target
      }
    }

    if (info.activityObj.description) {
      activityDefinition.description[ConfigTC.language] = info.activityObj.description
    } else {
      activityDefinition.description[ConfigTC.language] = info.activityObj.name
    }

    const statement = new TinCan.Statement({
      actor: this.actor,
      verb: {
        "display": {
          "en-US": info.verbType
        },
        "id": defaults.verbsURI + info.verbType
      },
      object: {
        "id": ConfigTC.uri + createPath(info.activityObj) + "/" + info.activityObj.id,
        "definition": activityDefinition
      },
      context: this.getContext(info.activityObj)
    })

    if (info.resultObj !== undefined) statement.result = new TinCan.Result(info.resultObj)

    if (ConfigTC.send) this.saveStatement(statement, cb)
  }

  getContext(activityObj) {
    const ctx = {
      contextActivities: {
        grouping: [{
          id: ConfigTC.uri + "/" + activityObj.id
        }, {
          id: ConfigTC.uri
        }],
        category: [{
          id: ConfigTC.uri + "/" + categoryObj.id,
          definition: {
            type: "http://id.tincanapi.com/activitytype/source",
            name: {
              [ConfigTC.language]: categoryObj.name,
            },
            description: {
              [ConfigTC.language]: categoryObj.description,
            }
          }
        }]
      }
    }

    if (activityObj.parent !== undefined) {
      ctx.contextActivities.parent = {
        id: ConfigTC.uri + createPath(activityObj),
      }
      if (activityObj.parent.parent !== undefined && activityObj.parent.parent.type === "assessment") {
        ctx.contextActivities.grouping.push({
          id: ConfigTC.uri + createPath(activityObj.parent),
        })
      }
    }

    if (activityObj.type == "assessment") {
      ctx.contextActivities.grouping.push({
        id: ConfigTC.uri + createPath(activityObj),
      })
    }

    return ctx
  }

  saveStatement(stm, callBack) {
    if (typeof callBack === "function") {
      if (!ConfigTC.online) this.lrs.saveStatements([stm], {
        callback: callBack
      })
      else this.lrs.saveStatements([stm], callBack)
    } else {
      if (!ConfigTC.online) this.lrs.saveStatements([stm])
      else this.lrs.saveStatements([stm])
    }
  }
}

function parseURL(url) {
  const params = url.slice(url.indexOf("?") + 1)

  const paramsArr = params.split("&")

  const paramsObj = paramsArr.reduce((obj, param) => {
    const hash = param.split("=")

    const decodeValue = hash[1] && decodeURIComponent(decodeURIComponent(hash[1]))

    let value

    try {
      value = JSON.parse(decodeValue)
    } catch (e) {
      value = decodeValue
    }

    obj[hash[0]] = value

    return obj
  }, {})

  return paramsObj
}

function initLRS(auth, endpoint) {
  try {
    return new TinCan.LRS({
      endpoint: endpoint,
      auth: auth,
      allowFail: false,
    })
  } catch (err) {
    console.log(err)
    return
  }
}

async function getInfoFromXML(fileName) {
  const response = await fetch(fileName)
  const data = await response.text()

  if (!data) return

  const XML = new window.DOMParser().parseFromString(data, "text/xml")
  const {
    uri,
    id,
    type
  } = (() => {
    const activityTag = XML.getElementsByTagName("activity")[0]
    const attrId = activityTag.getAttribute("id")
    const splitterInd = attrId.lastIndexOf("/") + 1
    const uri = attrId.substring(0, splitterInd)
    const id = attrId.substring(splitterInd, attrId.length)
    const type = activityTag.getAttribute("type")
    return {
      uri,
      id,
      type
    }
  })()

  const name = XML.getElementsByTagName("name")[0].innerHTML
  const description = XML.getElementsByTagName("description")[0].innerHTML

  return {
    uri,
    id,
    name,
    description,
    type
  }
}

function createPath(actObj) {
  let pPath = ""
  let parent = actObj.parent

  while (parent !== undefined) {
    pPath = "/" + parent.id + pPath
    parent = parent.parent
  }
  return pPath
}

export default {
  install: (app) => {
    app.config.globalProperties.$tincan = new TinCanHelper()
  }
}