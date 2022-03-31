// low, medium, hard

export default {
  0: {
    blockId: 0,
    blockType: "CourseMap",
    blockTitle: "DER Templates Libriry",
    blockBgImage: "./images/coursemap/course-map-bg.png",
  },
  1: {
    blockId: 1,
    blockType: "SlideLayout",
    blockTitle: "Clickers",
    blockBgImage: "",
    blockImage: "./images/coursemap/course-1.png",
    blockSlides: {
      1: {
        slideId: 1,
        type: "Slide_1_3",
        slideTitle: "FlipCards",
        level: "low",
        slideBgImage: "1-1-0",
        insruction: "",
        data: {
          title: "Для создания эффективной системы информационной <br> безопасности должны быть разработаны:",
          items: [{
            front: "Концепция",
            back: "Определяет политику, <br> ее принципы <br> и цели."
          }, {
            front: "Стандарты",
            back: "Правила и принципы <br> защиты информации."
          }, {
            front: "Процедура",
            back: "<ul style='list-style: disc; margin: 0rem; text-align: left;'><li>Защита персональных <br> данных;</li><li>Порядок доступа <br> к информационным носителям, <br> системам и ресурсам.</li></ul>"
          }, {
            front: "Инструкции",
            back: "Что и как делать для <br> организации информационной <br> защиты и обеспечения <br> имеющихся стандартов."
          },],
          stickerText: ["Стратегию развития ИБ стоит рассматривать как некоторую карту, которая определяет ориентиры на местности и направляет к цели."]
        },
      },
    },
  },
  2: {
    blockId: 2,
    blockType: "TestLayout",
    blockTitle: "Tests",
    blockBgImage: "",
    blockImage: "./images/coursemap/course-4.png",
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
}