// low, medium, hard

export default {
  0: {
    blockId: 0,
    blockType: "CourseMap",
    blockTitle: "DER Templates Libriry",
    blockBgImage: "./images/coursemap/course-map-bg.jpg",
  },
  1: {
    blockId: 1,
    blockType: "TestLayout",
    blockTitle: "Tests",
    blockBgImage: "",
    blockImage: "./images/coursemap/course-1.png",
    result: true,
    blockSlides: {
      1: {
        slideId: 1,
        type: "MultipleTest",
        slideTitle: "MultipleTest",
        level: "low",
        slideBgImage: "",
        instruction: "Выберите правильные ответы и нажмите Принять ответ",
        question: "Чем занимается IRT?",
        correct: "Это правильно! Отлично сработано!",
        incorrect: "Ваш ответ неверен.",
        choice: [{
          text: "Анализирует информацию об инцидентах",
          value: true,
        }, {
          text: "Обсуждает наблюдения и действия по всей компании",
          value: true,
        }, {
          text: "Поддерживает пользователей",
          value: false,
        }, {
          text: "Делится важными отчетами и сообщениями об инцидентах по всей компании",
          value: true,
        }, {
          text: "Устанавливают и обновляют ПО",
          value: false,
        }, {
          text: "Реагирует на инциденты",
          value: true,
        },]
      },
      2: {
        slideId: 2,
        type: "InputTest",
        slideTitle: "InputTest",
        level: "low",
        slideBgImage: "",
        instruction: "Введите правильный ответ и нажмите Принять ответ",
        question: "Недропользователи, осуществляющие разведку или добычу углеводородных полезных ископаемых, предоставляют ежеквартальный отчет о выполнении условий контракта не позднее ${25} числа месяца, следующего за отчетным периодом.",
        correct: "Это правильно! Отлично сработано!",
        incorrect: "Ваш ответ неверен.",
        max: 4,
        value: ["25"],
      },
      3: {
        slideId: 3,
        type: "DropDownTest",
        slideTitle: "DropDownTest",
        level: "medium",
        slideBgImage: "",
        instruction: "Выберите правильные ответы из раскрывающихся списков и нажмите Принять ответ",
        question: "Недропользователь может быть привлечен к ответственности за нарушение обязательств по контрактам или лицензиям на недропользование в течение |?одного года &-& двух лет &-& трех лет| со дня, когда государственный орган, осуществляющий контроль за соблюдением недропользователями условий контрактов узнал о нарушении данных условий.",
        value: ["трех лет"],
        correct: "Правильно! Отлично сработано!",
        incorrect: "Ваш ответ неверен.",
      },
      4: {
        slideId: 4,
        type: "DragNDropTest",
        slideTitle: "DragNDropTest",
        level: "hard",
        slideBgImage: "",
        instruction: "Перетащите определения соответственно к видам способностей и нажмите на Принять ответ",
        question: "Соотнесите определения с наименованиями способностей руководителей, необходимых для реализации перемен в организациях",
        correct: "Это правильно!",
        incorrect: "Ваш ответ неверен",
        choice: {
          "Управленческие способности": ["Качества, данные от природы, которые не сводятся только к знаниям и навыкам, а предполагают наличие врожденных способностей быть лидером, обладать умением влиять на поведение людей в условиях проведения изменений."],
          "Организаторские способности": ["Умение четко определять цели изменений, умение планировать изменения в своей работе и в работе подчиненных, а также быть предприимчивым в принятии и реализации решений об изменениях в компании."],
        },
      },
      5: {
        slideId: 5,
        type: "WordDragTest",
        slideTitle: "WordDragTest",
        level: "hard",
        slideBgImage: "",
        instruction: "Перетащите слово в нужное место",
        question: "|? Ответственность | - это |? принятие на себя | обязательств по выполнению требующих решения задач.",
        correct: "Это правильно!",
        incorrect: "Ваш ответ неверен",
      },
      6: {
        slideId: 6,
        type: "SingleTest",
        slideTitle: "SingleTest",
        level: "low",
        slideBgImage: "",
        instruction: "Выберите достоверность приведенного выше утверждения, выбрав Верно или Неверно, и нажмите на Принять ответ",
        question: "Защита информации - это совокупность правил, регламентирующих порядок и условия доступа субъекта к информации и ее носителям.",
        correct: "Это правильно! Отлично сработано!",
        incorrect: "Ваш ответ неверен",
        choice: [{
          text: "Верно",
          value: false,
        }, {
          text: "Неверно",
          value: true,
        },]
      },
    },
  },
  2: {
    blockId: 2,
    blockType: "SlideLayout",
    blockTitle: "Clickers",
    blockBgImage: "",
    blockImage: "./images/coursemap/course-2.png",
    blockSlides: {
      1: {
        slideId: 1,
        type: "FlipCards",
        slideTitle: "FlipCards",
        level: "low",
        slideBgImage: "",
        insruction: "",
        data: {
          items: [{
            front: "1-front",
            back: "1-back"
          }, {
            front: "2-front",
            back: "2-back"
          }, {
            front: "3-front",
            back: "3-back"
          }, {
            front: "4-front",
            back: "4-back"
          },],
        },
      },
      2: {
        slideId: 2,
        type: "FlipCardsToggle",
        slideTitle: "FlipCardsToggle",
        level: "low",
        slideBgImage: "",
        insruction: "",
        data: {
          items: [{
            front: "1-front",
            back: "1-back"
          }, {
            front: "2-front",
            back: "2-back"
          }, {
            front: "3-front",
            back: "3-back"
          }, {
            front: "4-front",
            back: "4-back"
          },],
        },
      },
      3: {
        slideId: 3,
        type: "FlipCardsOnly",
        slideTitle: "FlipCardsOnly",
        level: "low",
        slideBgImage: "",
        insruction: "",
        data: {
          items: [{
            front: "1-front",
            back: "1-back"
          }, {
            front: "2-front",
            back: "2-back"
          }, {
            front: "3-front",
            back: "3-back"
          }, {
            front: "4-front",
            back: "4-back"
          },],
        },
      },
      4: {
        slideId: 4,
        type: "TabColumns",
        slideTitle: "TabColumns",
        level: "low",
        slideBgImage: "",
        insruction: "",
        data: {
          items: [{
            title: "Header 1",
            content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tempora enim ipsum natus optio inventore dolore quos iure cumque adipisci. Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis aut excepturi eveniet maxime neque porro facere quasi illum odit, iste ipsum expedita commodi odio delectus nulla labore cum fuga maiores dolores, at suscipit dicta modi, distinctio laboriosam. Accusantium, ullam! Veniam?"
          }, {
            title: "Header 2",
            content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tempora enim ipsum natus optio inventore dolore quos iure cumque adipisci. Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis aut excepturi eveniet maxime neque porro facere quasi illum odit, iste ipsum expedita commodi odio delectus nulla labore cum fuga maiores dolores, at suscipit dicta modi, distinctio laboriosam. Accusantium, ullam! Veniam?"
          }, {
            title: "Header 3",
            content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tempora enim ipsum natus optio inventore dolore quos iure cumque adipisci. Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis aut excepturi eveniet maxime neque porro facere quasi illum odit, iste ipsum expedita commodi odio delectus nulla labore cum fuga maiores dolores, at suscipit dicta modi, distinctio laboriosam. Accusantium, ullam! Veniam?"
          },],
        },
      },
      5: {
        slideId: 5,
        type: "TabRows",
        slideTitle: "TabRows",
        level: "low",
        slideBgImage: "",
        insruction: "",
        data: {
          items: [{
            title: "Header 1",
            content: "1 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tempora enim ipsum natus optio inventore dolore quos iure cumque adipisci. Lorem ipsum dolor sit amet consectetur adipisicing elit."
          }, {
            title: "Header 2",
            content: "2 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tempora enim ipsum natus optio inventore dolore quos iure cumque adipisci. Lorem ipsum dolor sit amet consectetur adipisicing elit."
          }, {
            title: "Header 3",
            content: "3 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tempora enim ipsum natus optio inventore dolore quos iure cumque adipisci. Lorem ipsum dolor sit amet consectetur adipisicing elit."
          }, {
            title: "Header 4",
            content: "4 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur tempora enim ipsum natus optio inventore dolore quos iure cumque adipisci. Lorem ipsum dolor sit amet consectetur adipisicing elit."
          },],
        },
      }
    },
  },
  3: {
    blockId: 3,
    blockType: "SlideLayout",
    blockTitle: "Drag And Drops",
    blockBgImage: "",
    blockImage: "./images/coursemap/course-3.png",
    blockSlides: {
      1: {
        slideId: 1,
        type: "DnDRatio",
        slideTitle: "DnDRatio",
        level: "hard",
        slideBgImage: "",
        insruction: "",
        data: {
          drops: [{
            type: 1,
            title: "title - 1"
          }, {
            type: 2,
            title: "title - 2"
          }, {
            type: 3,
            title: "title - 3"
          },],
          drags: [{
            id: 1,
            type: [1],
            text: "1  Lorem ipsum dolor sit amet."
          }, {
            id: 2,
            type: [2],
            text: "2  Lorem ipsum dolor sit amet."
          }, {
            id: 3,
            type: [3],
            text: "3  Lorem ipsum dolor sit amet."
          }]
        },
      },
    },
  },
}