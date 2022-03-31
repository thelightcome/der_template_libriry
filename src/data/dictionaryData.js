export default {
  ru: {
    send: "Принять ответ",
    clickNext: "Нажмите на Далее, чтобы продолжить",
    check: "Проверить",
    next: "Далее",
    chooseBlock: "Выберите подтему",
    previous: "Назад",
    correct: "И это правильно! Молодец!",
    incorrect: "Ваш ответ неверен",
    additional: "Нажмите на кнопку Узнать подробности",
    podrobnee: "Подробнее",
    downloadPdf: "Скачать PDF",
    navigation: "Прогресс",
    library: "Библиотека",
    glossary: "Глоссарий",
    download: "Скачать",
    chooseLetter: "Выберите букву",
    true: "Верно",
    false: "Неверно",
    emptyDeck: "Колода пуста!",
    yes: "Да",
    no: "Нет",
    select: "Выбрать",
    testTitleText: (index, total) => {
      return `Вопрос ${index} из ${total}`
    },
    testEndText: (qcount, correct) => {
      return `Количество правильных ответов: ${ correct } из ${ qcount }.`
    }
  },
  kk: {
    send: "Жіберу",
    clickNext: "Жалғастыру үшін Келесі батырмасын басыңыз",
    check: "Тексеру",
    next: "Келесі",
    chooseBlock: "Ішкі тақырыпты таңдаңыз",
    previous: "Артқа",
    correct: "Бұл дұрыс! Жарайсың!",
    incorrect: "Сіздің жауабыңыз дұрыс емес",
    additional: "Толығырақ білу батырмасын  басыңыз",
    podrobnee: "Толығырақ",
    downloadPdf: "PDF-ті жүктеу",
    navigation: "Прогресс",
    library: "Кітапхана",
    glossary: "Глоссарий",
    download: "Жүктеп алу",
    chooseLetter: "Әріп таңдау",
    true: "Дұрыс",
    false: "Қате",
    emptyDeck: "Палуба бос!",
    yes: "Иә",
    no: "Жоқ",
    select: "Таңдау",
    testTitleText: (index, total) => {
      return `${index} сұрақтан ${total} сұрақ`
    },
    testEndText: (qcount, correct) => {
      return `Сұрақтар ${qcount}. \n Дұрыс жауаптар саны ${correct}`
    }
  },
}